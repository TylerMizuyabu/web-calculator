import { Injectable } from '@nestjs/common';
import { Calculation } from '../models/calculation';

@Injectable()
export class CalculationsService {
  private previousCalculations = new Array<Calculation>(10);

  addCalculation(c: Calculation) {
    this.previousCalculations = [c, ...this.previousCalculations.slice(0, this.previousCalculations.length - 1)];
  }
}
