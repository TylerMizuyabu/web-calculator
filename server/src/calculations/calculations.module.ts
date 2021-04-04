import { Module } from '@nestjs/common';
import { CalculationsGateway } from './gateways/calculations.gateway';
import { CalculationsService } from './services/calculations.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [
    CalculationsService,
    CalculationsGateway,
    { provide: 'MAX_STORED_CALCULATIONS', useValue: process.env.MAX_STORED_CALCULATIONS || 10 },
  ],
})
export class CalculationsModule {}
