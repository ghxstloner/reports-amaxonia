import { Injectable, Inject, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  KardexAlmacen,
  ParametrosGenerales,
  FacturaDetalle,
  TasasCambio,
  Divisas
} from 'src/entities';
import { PrinterService } from 'src/printer/printer.service';
import {
  getKardexReport,
  getCierreReport
} from 'src/reports'
import { convertToBolivares } from 'src/helpers';

@Injectable({ scope: Scope.REQUEST })
export class BasicReportsService {
  constructor(
    private readonly printerService: PrinterService,
    @Inject(REQUEST) private readonly req: Request,
  ) { }

  async getKardexReport(fechaInicio: string, fechaFin: string) {
    const manager = this.req['dbConnection'];
    const kardexRepository = manager.getRepository(KardexAlmacen);
    const tasasCambioRepository = manager.getRepository(TasasCambio);
    const divisasRepository = manager.getRepository(Divisas);

    const tiposMovimientoEntrada = [1, 3, 12];
    const tiposMovimientoSalida = [2, 4, 13];

    const existenciaInicialTransacciones = await kardexRepository
      .createQueryBuilder("kardexAlmacen")
      .leftJoin("kardexAlmacen.detalle", "detalle")
      .leftJoin("detalle.item", "item")
      .select([
        "detalle.id_item AS idItem",
        "item.referencia AS codigo",
        "item.descripcion1 AS descripcion1",
        "item.costo_actual AS costoUnitario",
        "item.id_moneda_base AS idMonedaBase",
        `(SELECT COALESCE(SUM(
            CASE 
              WHEN subKardex.tipo_movimiento_almacen IN (:...tiposMovimientoEntrada) THEN subDetalle.cantidad
              WHEN subKardex.tipo_movimiento_almacen IN (:...tiposMovimientoSalida) THEN -subDetalle.cantidad
              ELSE 0
            END
          ), 0) 
          FROM kardex_almacen AS subKardex
          LEFT JOIN kardex_almacen_detalle AS subDetalle ON subKardex.id_transaccion = subDetalle.id_transaccion
          WHERE subKardex.fecha < :start AND subDetalle.id_item = detalle.id_item
        ) AS existenciaInicial`
      ])
      .groupBy("detalle.id_item")
      .addGroupBy("item.referencia")
      .addGroupBy("item.descripcion1")
      .addGroupBy("item.costo_actual")
      .addGroupBy("item.id_moneda_base")
      .setParameter("start", fechaInicio)
      .setParameter("tiposMovimientoEntrada", tiposMovimientoEntrada)
      .setParameter("tiposMovimientoSalida", tiposMovimientoSalida)
      .getRawMany();

    const groupedData = {};

    for (const item of existenciaInicialTransacciones) {
      const idItem = item.idItem;
      const costoUnitarioBs = await convertToBolivares(
        parseFloat(item.costoUnitario),
        item.idMonedaBase,
        { usdToBs: tasasCambioRepository, copToBs: divisasRepository }
      );

      groupedData[idItem] = {
        codigo: item.codigo,
        descripcion1: item.descripcion1,
        existenciaInicial: item.existenciaInicial,
        cantidadEntrada: 0.00,
        montoEntrada: 0.00,
        cantidadSalida: 0.00,
        montoSalida: 0.00,
        cantidadExistencia: 0.00,
        existenciaFinal: 0.00,
        cantidadConsumo: 0.00,
        montoConsumo: 0.00,
        costoUnitario: costoUnitarioBs || 0.00,
      };
    }

    const transacciones = await kardexRepository
      .createQueryBuilder("kardexAlmacen")
      .leftJoinAndSelect("kardexAlmacen.detalle", "detalle")
      .leftJoinAndSelect("detalle.item", "item")
      .select([
        "kardexAlmacen.id_transaccion",
        "kardexAlmacen.tipo_movimiento_almacen",
        "kardexAlmacen.fecha",
        "detalle.id_transaccion_detalle",
        "detalle.cantidad",
        "detalle.costo",
        "item.id_item",
        "item.descripcion1",
        "item.referencia",
        "kardexAlmacen.id_documento"
      ])
      .where("kardexAlmacen.fecha BETWEEN :start AND :end", { start: fechaInicio, end: fechaFin })
      .andWhere("kardexAlmacen.tipo_movimiento_almacen IN (:...tipos)", { tipos: [...tiposMovimientoEntrada, ...tiposMovimientoSalida] })
      .getMany();

    for (const transaccion of transacciones) {
      for (const detalle of transaccion.detalle) {
        const key = detalle.item.id_item;

        if (!groupedData[key]) {
          groupedData[key] = {
            codigo: detalle.item.referencia,
            descripcion1: detalle.item.descripcion1,
            existenciaInicial: 0,
            cantidadEntrada: 0.00,
            montoEntrada: 0.00,
            cantidadSalida: 0.00,
            montoSalida: 0.00,
            cantidadConsumo: 0.00,
            montoConsumo: 0.00,
            cantidadExistencia: 0.00,
            existenciaFinal: 0
          };
        }

        const cantidad = detalle.cantidad || 0;
        const costo = parseFloat(detalle.costo) || 0;

        if (tiposMovimientoEntrada.includes(transaccion.tipo_movimiento_almacen)) {
          groupedData[key].cantidadEntrada += cantidad;
          groupedData[key].montoEntrada += costo;
        }

        if (tiposMovimientoSalida.includes(transaccion.tipo_movimiento_almacen)) {
          groupedData[key].cantidadSalida += cantidad;

          if (transaccion.tipo_movimiento_almacen === 2) {
            const facturaDetalles = await manager
              .getRepository(FacturaDetalle)
              .createQueryBuilder("facturaDetalle")
              .select("facturaDetalle._item_totalconiva", "_item_totalconiva")
              .where("facturaDetalle.id_factura = :idDocumento", { idDocumento: transaccion.id_documento })
              .andWhere("facturaDetalle.id_item = :idItem", { idItem: detalle.item.id_item })
              .getRawMany();

            const totalConIva = facturaDetalles.reduce((sum, rawDetalle) => {
              const itemTotal = parseFloat(rawDetalle._item_totalconiva);
              return sum + (isNaN(itemTotal) ? 0 : itemTotal);
            }, 0);

            groupedData[key].montoSalida += parseFloat(totalConIva.toFixed(2));
          } else if (transaccion.tipo_movimiento_almacen === 4) {
            groupedData[key].cantidadConsumo += cantidad;
            groupedData[key].montoConsumo += parseFloat((cantidad * groupedData[key].costoUnitario).toFixed(2));
          } else if (transaccion.tipo_movimiento_almacen === 13) {
            groupedData[key].montoSalida += parseFloat(costo.toFixed(2));
          }
        }

        groupedData[key].existenciaFinal =
          groupedData[key].existenciaInicial + groupedData[key].cantidadEntrada - groupedData[key].cantidadSalida;
      }
    }

    for (const key in groupedData) {
      const itemExistencia = await manager
        .getRepository('item_existencia_almacen')
        .createQueryBuilder("existencia")
        .select("SUM(existencia.cantidad)", "cantidad")
        .where("existencia.id_item = :idItem", { idItem: groupedData[key].codigo })
        .getRawOne();

      groupedData[key].cantidadExistencia = itemExistencia ? parseFloat(itemExistencia.cantidad) : 0.00;
    }

    return Object.values(groupedData);
  }

  async generateKardexPDFReport(data, fechaInicio: string, fechaFin: string) {
    const manager = this.req['dbConnection'];
    const parametrosRepository = manager.getRepository(ParametrosGenerales);
    const parametros = await parametrosRepository.findOneBy({});

    const docDefinition = getKardexReport({
      data,
      startDate: fechaInicio,
      endDate: fechaFin,
      companyParams: parametros
    });

    return this.printerService.createPdf(docDefinition);
  }


  async getCierreReport(idCaja: string, cajaSecuencia: string) {
    const manager = this.req['dbConnection'];
  
    const formasDePagoActivas = await manager
      .createQueryBuilder()
      .select("cajaFormaPago.descripcion", "descripcion")
      .from("caja_forma", "cajaForma")
      .innerJoin("caja_forma_pago", "cajaFormaPago", "cajaForma.id_forma_pago = cajaFormaPago.id_forma_pago")
      .where("cajaForma.id_caja = :idCaja", { idCaja })
      .andWhere("cajaForma.activo = 1")
      .getRawMany();
  
    const formasDePagoActivasDescripciones = formasDePagoActivas.map(fp => fp.descripcion);
  
    const facturas = await manager
      .createQueryBuilder()
      .select([
        "F.cod_factura AS codFactura",
        "F.id_factura AS idFactura",
        "F.fecha_creacion AS fechaFactura",
        "F.totalTotalFactura AS totalFactura",
        "cajaFormaPago.descripcion AS descripcionFormaPago",
        "CD.monto AS monto",
        "CD.id_forma_pago AS idFormaPago"
      ])
      .from("factura", "F")
      .leftJoin("caja_nueva", "CN", "CN.id_factura = F.id_factura")
      .leftJoin("caja_nueva_detalle", "CD", "CD.caja_id = CN.caja_id")
      .leftJoin("caja_forma_pago", "cajaFormaPago", "CD.id_forma_pago = cajaFormaPago.id_forma_pago")
      .where("CN.id_caja_secuencia = :cajaSecuencia", { cajaSecuencia })
      .andWhere("CD.id_forma_pago <> 30")
      .getRawMany();
  
    const facturaFormasCambio = await manager
      .createQueryBuilder()
      .select(["FFC.id_factura", "FFC.id_divisa", "FFC.monto"])
      .from("factura_forma_cambio", "FFC")
      .innerJoin("factura", "F", "F.id_factura = FFC.id_factura")
      .where("FFC.id_divisa IN (:...divisas)", { divisas: [14, 15, 20] })
      .andWhere("F.id_caja_secuencia = :cajaSecuencia", { cajaSecuencia })
      .getRawMany();
  
      const facturaCambioMap = facturaFormasCambio.reduce((map, item) => {
        if (!map[item.id_factura]) map[item.id_factura] = {};
      
        switch (item.id_divisa) {
          case 14:
            map[item.id_factura][15] = -Math.abs(item.monto); // Efectivo Bs.
            break;
          case 15:
            map[item.id_factura][67] = -Math.abs(item.monto); // Divisa $
            break;
          case 20:
            map[item.id_factura][74] = -Math.abs(item.monto); // Peso Colombiano
            break;
        }
        return map;
      }, {});
      
  
      const facturasConFormasDePago = facturas.reduce((acc, curr) => {
        let factura = acc.find(f => f.codFactura === curr.codFactura);
        if (!factura) {
          factura = {
            codFactura: curr.codFactura,
            fechaFactura: curr.fechaFactura,
            totalFactura: curr.totalFactura,
            formasDePago: {}
          };
          acc.push(factura);
        }
      
        const idFormaPago = parseInt(curr.idFormaPago);
        const montoOriginal = parseFloat(curr.monto);
      
        const ajusteDivisa = facturaCambioMap[curr.idFactura] && facturaCambioMap[curr.idFactura][idFormaPago];
      
        factura.formasDePago[curr.descripcionFormaPago] = ajusteDivisa !== undefined
          ? montoOriginal + ajusteDivisa
          : montoOriginal;
      
        return acc;
      }, []);
      
  
    const facturasFinal = facturasConFormasDePago.map(factura => {
      const formasDePago = formasDePagoActivasDescripciones.reduce((pagos, formaDePago) => {
        pagos[formaDePago] = factura.formasDePago[formaDePago] || "0.00";
        return pagos;
      }, {});
  
      return {
        codFactura: factura.codFactura,
        fechaFactura: factura.fechaFactura,
        totalFactura: factura.totalFactura,
        formasDePago
      };
    });
  
    return {
      idCajaSecuencia: cajaSecuencia,
      formasDePagoActivas: formasDePagoActivasDescripciones,
      fecha: new Date().toLocaleDateString(),
      tipo: 'Venta',
      facturas: facturasFinal
    };
  }


  async generateCierrePDFReport(data) {
    const manager = this.req['dbConnection'];
    const parametrosRepository = manager.getRepository(ParametrosGenerales);
    const parametros = await parametrosRepository.findOneBy({});

    const docDefinition = getCierreReport({
      data,
      companyParams: parametros
    });

    return this.printerService.createPdf(docDefinition);
  }

}
