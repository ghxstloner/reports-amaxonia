import { Injectable, Inject, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { KardexAlmacen, KardexAlmacenDetalle, Country, ParametrosGenerales } from 'src/entities';
import { PrinterService } from 'src/printer/printer.service';
import { Not, IsNull, Between, In } from 'typeorm';
import {
  getCountryReport,
  getEmploymentLetterReport,
  getHelloWorldReport,
  getKardexReport
} from 'src/reports'

@Injectable({ scope: Scope.REQUEST })
export class BasicReportsService {
  constructor(
    private readonly printerService: PrinterService,
    @Inject(REQUEST) private readonly req: Request, 
  ) {}

  hello(){
    const docDefinition = getHelloWorldReport({
      name: "Yoiner"
    })
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

   employmentLetter(){
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCountries() {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(Country);

    const countriesData = await repository.find({
        where: {
            localName: Not(IsNull()),
        },
    });

    const docDefinition = getCountryReport({
        title: 'Countries Report',
        subTitle: 'List of Countries',
        data: countriesData,
    });

    return this.printerService.createPdf(docDefinition);
  }

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

    // Definir los tipos de movimiento para Entrada y Salida
    const tiposMovimientoEntrada = [1, 3, 12];
    const tiposMovimientoSalida = [2, 4, 13];

    // Consulta a KardexAlmacen con relaciones explícitas
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
      ])
      .where("kardexAlmacen.fecha BETWEEN :start AND :end", { start: fechaInicio, end: fechaFin })
      .andWhere("kardexAlmacen.tipo_movimiento_almacen IN (:...tipos)", { tipos: [...tiposMovimientoEntrada, ...tiposMovimientoSalida] })
      .getMany();


    // Asegúrate de que data esté en una estructura plana
    const data = transacciones.flatMap(transaccion =>
        transaccion.detalle.map(detalle => ({
            codigo: detalle.item.referencia, // referencia en la entidad `Item`
            descripcion: detalle.item.descripcion, // descripción en la entidad `Item`
            cantidad: detalle.cantidad,
            tipoMovimiento: tiposMovimientoEntrada.includes(transaccion.tipo_movimiento_almacen) ? 'Entrada' : 'Salida',
        }))
    );

    return data;
}

async generateKardexPDFReport(data) {
    const docDefinition = getKardexReport({
        title: 'Kardex Report',
        subTitle: 'Reporte de Movimientos de Almacén',
        data,
    });
    return this.printerService.createPdf(docDefinition);
}

}
