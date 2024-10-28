import { Injectable, Inject, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  KardexAlmacen,
  KardexAlmacenDetalle,
  ParametrosGenerales,
  FacturaDetalle,
  CompraDetalle
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
        "item.id_item",
        "item.descripcion1",
        "item.referencia",
        "kardexAlmacen.id_documento"
      ])
      .where("kardexAlmacen.fecha BETWEEN :start AND :end", { start: fechaInicio, end: fechaFin })
      .andWhere("kardexAlmacen.tipo_movimiento_almacen IN (:...tipos)", { tipos: [...tiposMovimientoEntrada, ...tiposMovimientoSalida] })
      .getMany();

    const groupedData = {};

    for (const transaccion of transacciones) {
        for (const detalle of transaccion.detalle) {
            const key = detalle.item.referencia;
            if (!groupedData[key]) {
                groupedData[key] = {
                    codigo: detalle.item.referencia,
                    descripcion1: detalle.item.descripcion1,
                    cantidadEntrada: 0.00,
                    cantidadSalida: 0.00,
                    montoEntrada: 0.00,
                    montoSalida: 0.00,
                    cantidadExistencia: 0.00
                };
            }

            if (tiposMovimientoEntrada.includes(transaccion.tipo_movimiento_almacen)) {
                groupedData[key].cantidadEntrada += detalle.cantidad;

                if (transaccion.tipo_movimiento_almacen === 1) {
                    const compraDetalles = await manager
                        .getRepository(CompraDetalle)
                        .createQueryBuilder("compraDetalle")
                        .select("compraDetalle._item_totalconiva", "_item_totalconiva")
                        .where("compraDetalle.id_compra = :idDocumento", { idDocumento: transaccion.id_documento })
                        .andWhere("compraDetalle.id_item = :idItem", { idItem: detalle.item.id_item })
                        .getRawMany();

                    const totalConIva = compraDetalles.reduce((sum, rawDetalle) => {
                        const itemTotal = parseFloat(rawDetalle._item_totalconiva);
                        return sum + (isNaN(itemTotal) ? 0 : itemTotal);
                    }, 0);

                    groupedData[key].montoEntrada = parseFloat((groupedData[key].montoEntrada + totalConIva).toFixed(2));
                }
            } else if (tiposMovimientoSalida.includes(transaccion.tipo_movimiento_almacen)) {
                groupedData[key].cantidadSalida += detalle.cantidad;

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

                    groupedData[key].montoSalida = parseFloat((groupedData[key].montoSalida + totalConIva).toFixed(2));
                }
            }

            const existencia = await manager
                .getRepository('item_existencia_almacen')
                .createQueryBuilder("existencia")
                .select("SUM(existencia.cantidad)", "cantidad")
                .where("existencia.id_item = :idItem", { idItem: detalle.item.id_item })
                .getRawOne();

            groupedData[key].cantidadExistencia = existencia ? parseFloat(existencia.cantidad) : 0.00;
        }
    }

    const data = Object.values(groupedData);
    return data;
}


  async generateKardexPDFReport(data, fechaInicio: string, fechaFin: string) {
    const manager = this.req['dbConnection'];
    const parametrosRepository = manager.getRepository(ParametrosGenerales);
    const parametros = await parametrosRepository.findOneBy({});

    const docDefinition = getKardexReport({
      title: 'Libro de Movimientos de Almacen',
      subTitle: 'Reporte del Kardex',
      data,
      startDate: fechaInicio,
      endDate: fechaFin,
      companyParams: parametros
    });

    return this.printerService.createPdf(docDefinition);
  }

}
