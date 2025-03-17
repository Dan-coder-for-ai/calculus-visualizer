import { Data, Layout } from 'plotly.js-dist';

interface PlotState {
  showGrid: boolean;
  showAxes: boolean;
  xRange: [number, number];
  yRange: [number, number];
  showPoints: boolean;
  lineWidth: number;
  pointSize: number;
}

export const createBaseLayout = (state: PlotState): Partial<Layout> => {
  const { showGrid, showAxes, xRange, yRange } = state;
  return {
    title: 'Function Visualization',
    xaxis: {
      title: 'x',
      showgrid: showGrid,
      showline: showAxes,
      zeroline: showAxes,
      range: xRange,
    },
    yaxis: {
      title: 'y',
      showgrid: showGrid,
      showline: showAxes,
      zeroline: showAxes,
      range: yRange,
    },
    showlegend: true,
    margin: { t: 40, r: 20, b: 40, l: 60 },
  };
};

export const createFunctionTrace = (
  x: number[],
  y: number[],
  state: PlotState,
  name: string = 'f(x)',
  color: string = '#1976d2'
): Data => {
  const { showPoints, lineWidth, pointSize } = state;
  return {
    x,
    y,
    name,
    type: 'scatter',
    mode: showPoints ? 'lines+markers' : 'lines',
    line: {
      color,
      width: lineWidth,
    },
    marker: {
      size: pointSize,
      color,
    },
  };
};

export const createTangentLineTrace = (
  x: number[],
  y: number[],
  name: string = 'Tangent Line'
): Data => {
  return {
    x,
    y,
    name,
    type: 'scatter',
    mode: 'lines',
    line: {
      color: '#dc004e',
      width: 2,
      dash: 'dash',
    },
  };
};

export const createAreaTrace = (
  x: number[],
  y: number[],
  name: string = 'Area'
): Data => {
  return {
    x,
    y,
    name,
    type: 'scatter',
    mode: 'lines',
    fill: 'tozeroy',
    line: {
      color: '#1976d2',
      width: 1,
    },
  };
}; 