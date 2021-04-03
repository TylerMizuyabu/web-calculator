import { TestBed } from '@angular/core/testing';

import { EvaluatorService } from './evaluator.service';
import { equations } from './test/equations';

describe('EvaluatorService', () => {
  let service: EvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toRPN', () => {
    it('should convert the tokens into RPN using shuntingYard', () => {
      for (let eq of equations) {
        const actual = service.toRPN(eq.tokens);
        expect(actual.length).toEqual(eq.rpn.length);
        for (let i = 0; i < actual.length; i++) {
          expect(actual[i].equals(eq.rpn[i])).toBeTrue();
        }
      }
    });
  });

  describe('evaluateRPN', () => {
    it('should correctly evaluate the tokens in RPN', () => {
      for (let eq of equations) {
        const actual = service.evaluateRPN(eq.rpn);
        expect(actual).toEqual(eq.result);
      }
    });
  });
});
