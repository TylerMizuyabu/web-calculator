import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationEntity } from './entities/calculation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalculationEntity])],
  exports: [TypeOrmModule],
})
export class DbModule {}
