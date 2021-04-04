import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationsModule } from './calculations/calculations.module';
import * as ormConfig from './ormconfig';

@Module({
  imports: [CalculationsModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
