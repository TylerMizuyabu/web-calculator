import { Component, OnInit } from '@angular/core';
import { Operators } from '../shared/token';
import { minFn, maxFn, sqrtFn, logFn } from '../shared/functions/general';
import { sinFn, cosFn, tanFn } from '../shared/functions/trig';

@Component({
  selector: 'app-instruction-card',
  templateUrl: './instruction-card.component.html',
  styleUrls: ['./instruction-card.component.scss'],
})
export class InstructionCardComponent implements OnInit {
  static readonly operatorDescriptions: [string, string][] = [
    [Operators.Add, 'Addition Operator'],
    [Operators.Subtract, 'Subtraction Operator'],
    [Operators.Multiply, 'Multiplication Operator'],
    [Operators.Divide, 'Division Operator'],
    [Operators.PowerOf, 'Exponent Operator'],
  ];
  static readonly functionDescriptions: [string, string][] = [
    [minFn.positiveIdentifier, 'min function returns the minimum of two numbers/expressions. Requires exactly 2 arguments'],
    [maxFn.positiveIdentifier, 'max function returns the maximum of two numbers/expressions. Requires exactly 2 arguments'],
    [sqrtFn.positiveIdentifier, 'square root function returns the square root of a number/expression'],
    [logFn.positiveIdentifier, 'log function returns the natural logarithm of a number/expression'],
    [sinFn.positiveIdentifier, 'sine function returns the sine of a number/expression'],
    [cosFn.positiveIdentifier, 'cosine function returns the cos of a number/expression'],
    [tanFn.positiveIdentifier, 'tanjent function returns the tan of a number/expression'],
  ];

  constructor() {}

  ngOnInit(): void {}

  getOperatorDescriptions(): [string, string][] {
    return InstructionCardComponent.operatorDescriptions;
  }

  getFunctionsDescriptions(): [string, string][] {
    return InstructionCardComponent.functionDescriptions;
  }
}
