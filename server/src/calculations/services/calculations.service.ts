import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculation } from '../models/calculation';
import { CalculationEntity } from '../../db/entities/calculation.entity';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CalculationsService {
  private previousCalculations: Calculation[];

  constructor(
    @InjectRepository(CalculationEntity)
    private readonly calculationRepository: Repository<CalculationEntity>,
    @Inject('MAX_STORED_CALCULATIONS') readonly maxCalculations: string,
  ) {
    let arrLength: number;
    try {
      arrLength = parseInt(maxCalculations, 10);
    } catch (err) {
      console.error(
        'Unable to parse maxCalculations input. Please check the environment variable MAX_STORED_CALCULATIONS. Defaulting to 10',
      );
      arrLength = 10;
    }

    this.previousCalculations = new Array<Calculation>(arrLength);
    this.calculationRepository
      .find({
        take: arrLength,
        order: {
          createdDate: 'DESC',
        },
      })
      .then((entities) => {
        entities.forEach((e, i) => {
          this.previousCalculations[i] = this.mapToModel(e);
        });
      });
  }

  addCalculation(c: Calculation): Observable<Calculation> {
    return from(this.calculationRepository.save(this.mapToEntity(c))).pipe(
      tap(() => {
        this.previousCalculations = [c, ...this.previousCalculations.slice(0, this.previousCalculations.length - 1)];
      }),
    );
  }

  getCalculations(): Calculation[] {
    return [...this.previousCalculations];
  }

  private mapToEntity(c: Calculation): CalculationEntity {
    const entity = new CalculationEntity();
    entity.equation = c.equation;
    entity.result = c.result;
    return entity;
  }

  private mapToModel(e: CalculationEntity): Calculation {
    return {
      equation: e.equation,
      result: e.result,
    };
  }
}
