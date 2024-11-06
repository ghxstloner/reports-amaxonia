import { Controller, Get, Query, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

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

  @Get('cierre-report')
  async getReportCierre(
      @Query('cajaSecuencia') cajaSecuencia: string,
      @Res() response: Response,
  ) {
      const data = await this.basicReportsService.getCierreReport(cajaSecuencia);
      const pdfDoc = await this.basicReportsService.generateCierrePDFReport(data);
      response.setHeader('Content-Type', 'application/pdf');
      pdfDoc.info.Title = "Reporte Cierre de Caja";
      pdfDoc.pipe(response);
      pdfDoc.end();
  }
  

}
