import { Injectable, Inject, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  KardexAlmacen,
  ParametrosGenerales,
  FacturaDetalle,
} from 'src/entities';
import { PrinterService } from 'src/printer/printer.service';
import { Not, IsNull, Between, In } from 'typeorm';
import {
  getKardexReport
} from 'src/reports'

@Injectable({ scope: Scope.REQUEST })
export class BasicReportsService {
  constructor(
    private readonly printerService: PrinterService,
    @Inject(REQUEST) private readonly req: Request,
  ) { }

  async getFirstKardexAlmacen(): Promise<KardexAlmacen> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(KardexAlmacen);
    const [firstRecord] = await repository.find({
      order: { fecha: 'ASC' },
      take: 1,
    });
    return firstRecord;
  }

  async getKardexReport(fechaInicio: string, fechaFin: string) {
    const manager = this.req['dbConnection'];
    const kardexRepository = manager.getRepository(KardexAlmacen);

    const tiposMovimientoEntrada = [1, 3, 12];
    const tiposMovimientoSalida = [2, 4, 13];

    // Ajustar inventario inicial hasta el día anterior a `fechaInicio`
    const existenciaInicialTransacciones = await kardexRepository
    .createQueryBuilder("kardexAlmacen")
    .leftJoin("kardexAlmacen.detalle", "detalle")
    .leftJoin("detalle.item", "item")
    .select([
      "detalle.id_item AS idItem",
      "item.referencia AS codigo",
      "item.descripcion1 AS descripcion1",
      "item.costo_actual AS costoUnitario",
      `(SELECT COALESCE(SUM(
          CASE WHEN subKardex.tipo_movimiento_almacen IN (:...tiposMovimientoEntrada) THEN subDetalle.cantidad
               WHEN subKardex.tipo_movimiento_almacen IN (:...tiposMovimientoSalida) THEN -subDetalle.cantidad
               ELSE 0
          END
      ), 0) 
      FROM kardex_almacen AS subKardex
      LEFT JOIN kardex_almacen_detalle AS subDetalle ON subKardex.id_transaccion = subDetalle.id_transaccion
      WHERE subKardex.fecha < :start AND subDetalle.id_item = detalle.id_item
      ) AS existenciaInicial`
    ])
    .where("kardexAlmacen.fecha < :start", { start: fechaInicio })
    .groupBy("detalle.id_item")
    .addGroupBy("item.referencia")
    .addGroupBy("item.descripcion1")
    .addGroupBy("item.costo_actual")
    .setParameter("tiposMovimientoEntrada", tiposMovimientoEntrada)
    .setParameter("tiposMovimientoSalida", tiposMovimientoSalida)
    .getRawMany();

    console.error("Existencia Inicial Transacciones:", existenciaInicialTransacciones);

    const groupedData = {};

    for (const item of existenciaInicialTransacciones) {
      const idItem = item.idItem;

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
        costoUnitario: parseFloat(item.costoUnitario || 0),
      };
    }

    // El resto del código permanece igual
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
            cantidadConsumo: 0.00,  // Inicialización de cantidadConsumo
            montoConsumo: 0.00,     // Inicialización de montoConsumo
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

}
