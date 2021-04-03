import { Module } from '@nestjs/common';
import { CalculationsController } from './controllers/calculations.controller';
import { CalculationsService } from './services/calculations.service';

@Module({
  controllers: [CalculationsController],
  providers: [CalculationsService],
})
export class CalculationsModule {}
