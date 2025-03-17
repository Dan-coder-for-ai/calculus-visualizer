import * as math from 'mathjs';

export const evaluateFunction = (func: string, x: number): number => {
  try {
    return math.evaluate(func, { x });
  } catch (error) {
    console.error('Error evaluating function:', error);
    return NaN;
  }
};

export const generatePoints = (
  func: string,
  xRange: [number, number],
  numPoints: number = 200
): { x: number[]; y: number[] } => {
  const [xMin, xMax] = xRange;
  const step = (xMax - xMin) / (numPoints - 1);
  const x = Array.from({ length: numPoints }, (_, i) => xMin + i * step);
  const y = x.map((xi) => evaluateFunction(func, xi));
  return { x, y };
};

export const calculateDerivative = (
  func: string,
  x: number,
  h: number = 0.0001
): number => {
  try {
    return (evaluateFunction(func, x + h) - evaluateFunction(func, x)) / h;
  } catch (error) {
    console.error('Error calculating derivative:', error);
    return NaN;
  }
};

export const calculateIntegral = (
  func: string,
  a: number,
  b: number,
  n: number = 100
): number => {
  try {
    const dx = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = a + i * dx;
      sum += evaluateFunction(func, x) * dx;
    }
    return sum;
  } catch (error) {
    console.error('Error calculating integral:', error);
    return NaN;
  }
};

export const calculateHigherDerivative = (
  func: string,
  x: number,
  order: number,
  h: number = 0.0001
): number => {
  try {
    let derivative = func;
    for (let i = 0; i < order; i++) {
      derivative = math.derivative(derivative, 'x').toString();
    }
    return evaluateFunction(derivative, x);
  } catch (error) {
    console.error('Error calculating higher derivative:', error);
    return NaN;
  }
}; 