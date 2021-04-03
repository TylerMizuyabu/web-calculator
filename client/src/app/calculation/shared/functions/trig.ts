import MathFunction from './function';

export const sinFn: MathFunction = {
  minArgs: 1,
  maxArgs: 1,
  positiveIdentifier: 'sin',
  negativeIdentifier: '-sin',
  applyFn: (args: number[]): number => {
    return Math.sin(args[0]);
  },
};

export const cosFn: MathFunction = {
  minArgs: 1,
  maxArgs: 1,
  positiveIdentifier: 'cos',
  negativeIdentifier: '-cos',
  applyFn: (args: number[]): number => {
    return Math.cos(args[0]);
  },
};

export const tanFn: MathFunction = {
  minArgs: 1,
  maxArgs: 1,
  positiveIdentifier: 'tan',
  negativeIdentifier: '-tan',
  applyFn: (args: number[]): number => {
    return Math.tan(args[0]);
  },
};
