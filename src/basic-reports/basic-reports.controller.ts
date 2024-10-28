import { Controller, Get, Query, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { KardexAlmacen } from '../entities/kardex-almacen.entity';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get('kardex')
  async getFirstKardexAlmacen(): Promise<KardexAlmacen> {
    return this.basicReportsService.getFirstKardexAlmacen();
  }

  @Get('kardex-report')
  async getKardexReport(
      @Query('fechaInicio') fechaInicio: string,
      @Query('fechaFin') fechaFin: string,
      @Res() response: Response,
  ) {
      const data = await this.basicReportsService.getKardexReport(fechaInicio, fechaFin);
      const pdfDoc = await this.basicReportsService.generateKardexPDFReport(data, fechaInicio, fechaFin);
      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = "Reporte Kardex";
      pdfDoc.pipe(response);
      pdfDoc.end();
  }
  

}
