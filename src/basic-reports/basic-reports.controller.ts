import { Controller, Get } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { KardexAlmacen } from './entities/kardex-almacen.entity';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async getBasicReports(): Promise<string> {
    return 'Hello from /basic-reports!';
  }

  @Get('hello')
  async getFirstKardexAlmacen(): Promise<KardexAlmacen> {
    return this.basicReportsService.getFirstKardexAlmacen();
  }
}
