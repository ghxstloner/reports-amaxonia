import { Injectable, Inject, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { KardexAlmacen, KardexAlmacenDetalle, Country, ParametrosGenerales } from 'src/entities';
import { PrinterService } from 'src/printer/printer.service';
import { Not, IsNull } from 'typeorm';
import {
  getCountryReport,
  getEmploymentLetterReport,
  getHelloWorldReport
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



  async getAllParametrosGenerales(): Promise<ParametrosGenerales[]> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(ParametrosGenerales);
    return repository.find();
  }

  async getAllKardexAlmacen(): Promise<KardexAlmacen[]> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(KardexAlmacen);
    return repository.find({ relations: ['detalles'] });
  }

  async getAllKardexAlmacenDetalle(): Promise<KardexAlmacenDetalle[]> {
    const manager = this.req['dbConnection'];
    const repository = manager.getRepository(KardexAlmacenDetalle);
    return repository.find({ relations: ['kardexAlmacen'] });
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
}
