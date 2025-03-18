export const evaluateFunction = (func: string, x: number): number => {
  try {
    // Replace x with the actual value
    const expression = func.replace(/x/g, x.toString());
    // Use Function constructor to evaluate the expression
    return Function(`'use strict'; return (${expression})`)();
  } catch (error) {
    console.error('Error evaluating function:', error);
    return NaN;
  }
};

export const generatePoints = (func: string, start: number, end: number): number[] => {
  const points: number[] = [];
  const step = (end - start) / 200; // Generate 200 points for smooth curve

  for (let x = start; x <= end; x += step) {
    const y = evaluateFunction(func, x);
    if (!isNaN(y)) {
      points.push(x);
    }
  }

  return points;
}; 