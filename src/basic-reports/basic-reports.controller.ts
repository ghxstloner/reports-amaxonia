import { Controller, Get, Query, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { KardexAlmacen } from '../entities/kardex-almacen.entity';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get('hello')
  async hello(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = "Hola - Mundo"
    pdfDoc.pipe(response)
    pdfDoc.end();
  }

  @Get('employee')
  async employeeLetterRepport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = "Hola - Mundo"
    pdfDoc.pipe(response)
    pdfDoc.end();
  }

  @Get('kardex')
  async getFirstKardexAlmacen(): Promise<KardexAlmacen> {
    return this.basicReportsService.getFirstKardexAlmacen();
  }

  @Get('countries')
  async getCountryReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = "Hola - Mundo"
    pdfDoc.pipe(response)
    pdfDoc.end();
  }

  @Get('kardex-report')
  async getKardexReport(
      @Query('fechaInicio') fechaInicio: string,
      @Query('fechaFin') fechaFin: string,
      @Res() response: Response,
  ) {
      const data = await this.basicReportsService.getKardexReport(fechaInicio, fechaFin);
      const pdfDoc = await this.basicReportsService.generateKardexPDFReport(data);
      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = "Kardex Report";
      pdfDoc.pipe(response);
      pdfDoc.end();
  }
  

}
