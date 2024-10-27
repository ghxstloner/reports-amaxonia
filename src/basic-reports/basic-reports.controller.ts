import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { KardexAlmacen } from '../entities/kardex-almacen.entity';
import { Response } from 'express';
import { getHelloWorldReport } from 'src/reports';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get('hello')
  async hello(@Res() response: Response){
    const pdfDoc = await this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = "Hola - Mundo"
    pdfDoc.pipe(response)
    pdfDoc.end();
  }

  @Get('employee')
  async employeeLetterRepport(@Res() response: Response){
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
  async getCountryReport(@Res() response: Response){
    const pdfDoc = await this.basicReportsService.getCountries();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = "Hola - Mundo"
    pdfDoc.pipe(response)
    pdfDoc.end();
  }
}
