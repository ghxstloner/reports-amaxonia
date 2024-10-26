import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { KardexAlmacen } from '../entities/kardex-almacen.entity';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response){
    const pdfDoc = await this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = "Hola - Mundo"
    pdfDoc.pipe(response)
    pdfDoc.end();
  }

  @Get('hello')
  async getFirstKardexAlmacen(): Promise<KardexAlmacen> {
    return this.basicReportsService.getFirstKardexAlmacen();
  }
}
