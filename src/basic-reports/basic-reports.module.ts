import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';

@Module({
  providers: [BasicReportsService],
  controllers: [BasicReportsController],
})
export class BasicReportsModule {}
