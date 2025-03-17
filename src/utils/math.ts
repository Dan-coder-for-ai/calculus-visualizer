import * as math from 'mathjs';

export const evaluateFunction = (functionStr: string, x: number): number => {
  try {
    const scope = { x };
    return math.evaluate(functionStr, scope) as number;
  } catch (error) {
    console.error('Error evaluating function:', error);
    return NaN;
  }
};

export const generatePoints = (functionStr: string, xRange: [number, number], numPoints: number = 1000): { x: number[]; y: number[] } => {
  const [xMin, xMax] = xRange;
  const x = Array.from({ length: numPoints }, (_, i) => xMin + (i * (xMax - xMin)) / (numPoints - 1));
  const y = x.map((xi) => evaluateFunction(functionStr, xi));
  return { x, y };
};

export const calculateDerivative = (functionStr: string, x: number, h: number = 0.0001): number => {
  try {
    const y1 = evaluateFunction(functionStr, x + h);
    const y2 = evaluateFunction(functionStr, x - h);
    return (y1 - y2) / (2 * h);
  } catch (error) {
    console.error('Error calculating derivative:', error);
    return NaN;
  }
};

export const calculateIntegral = (functionStr: string, a: number, b: number, n: number = 100): number => {
  try {
    const dx = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = a + i * dx;
      sum += evaluateFunction(functionStr, x);
    }
    return sum * dx;
  } catch (error) {
    console.error('Error calculating integral:', error);
    return NaN;
  }
};

export const calculateHigherDerivative = (functionStr: string, x: number, h: number = 0.0001, order: number = 1): number => {
  try {
    if (order === 1) {
      return calculateDerivative(functionStr, x, h);
    }
    return calculateHigherDerivative(`(${functionStr})'`, x, h, order - 1);
  } catch (error) {
    console.error('Error calculating higher derivative:', error);
    return NaN;
  }
}; 