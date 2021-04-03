import MathFunction from './function';

export const minFn: MathFunction = {
  minArgs: 1,
  maxArgs: 2, //for now I'm defining a max of two because otherwise it will fail for equations like -7+(3*2)+min(2,-3)
  positiveIdentifier: 'min',
  negativeIdentifier: '-min',
  applyFn: (args: number[]): number => {
    return Math.min(...args);
  },
};

export const maxFn: MathFunction = {
  minArgs: 1,
  maxArgs: 2, //for now I'm defining a max of two because otherwise it will fail for equations like -7+(3*2)+max(2,-3)
  positiveIdentifier: 'max',
  negativeIdentifier: '-max',
  applyFn: (args: number[]): number => {
    return Math.max(...args);
  },
};

export const logFn: MathFunction = {
  minArgs: 1,
  maxArgs: 1,
  positiveIdentifier: 'log',
  negativeIdentifier: '-log',
  applyFn: (args: number[]): number => {
    return Math.log(args[0]);
  },
};

export const sqrtFn: MathFunction = {
  minArgs: 1,
  maxArgs: 1,
  positiveIdentifier: 'sqrt',
  negativeIdentifier: '-sqrt',
  applyFn: (args: number[]): number => {
    return Math.sqrt(args[0]);
  },
};
