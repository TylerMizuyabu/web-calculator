export default interface MathFunction {
  minArgs: number | undefined;
  maxArgs: number | undefined;
  positiveIdentifier: string;
  negativeIdentifier: string;
  applyFn(args: number[]): number;
}
