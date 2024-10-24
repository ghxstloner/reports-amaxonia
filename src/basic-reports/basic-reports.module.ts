import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  providers: [BasicReportsService],
  controllers: [BasicReportsController],
  imports: [PrinterModule]
})
export class BasicReportsModule {}
