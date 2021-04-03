import MathFunction from './function';
import { sinFn, cosFn, tanFn } from './trig';
import { minFn, maxFn, logFn, sqrtFn } from './general';

const supportedFns: MathFunction[] = [sinFn, cosFn, tanFn, minFn, maxFn, logFn, sqrtFn];

export const fnMap: Map<string, MathFunction> = supportedFns.reduce((prev: Map<string, MathFunction>, current: MathFunction) => {
  prev.set(current.positiveIdentifier, current);
  prev.set(current.negativeIdentifier, current);
  return prev;
}, new Map<string, MathFunction>());

export function missingFunctionRequirements(numArgs: number, fn: MathFunction): string[] {
  const errors: string[] = [];
  if (!!fn.minArgs && numArgs < fn.minArgs) {
    errors.push(`requires a minimum of ${fn.minArgs} arguments`);
  }
  // can be modified to check other requirements if necessary

  return errors;
}
