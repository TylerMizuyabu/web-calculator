import { Module } from '@nestjs/common';
import { CalculationsGateway } from './gateways/calculations.gateway';
import { CalculationsService } from './services/calculations.service';

@Module({
  controllers: [],
  providers: [CalculationsService, CalculationsGateway],
})
export class CalculationsModule {}
