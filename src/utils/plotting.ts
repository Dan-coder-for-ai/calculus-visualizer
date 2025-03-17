import { Layout } from 'plotly.js';

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
    autosize: true,
    height: 400,
    margin: { t: 40, r: 20, b: 40, l: 60 },
    showlegend: true,
    xaxis: {
      title: 'x',
      showgrid: showGrid,
      showline: showAxes,
      zeroline: showAxes,
      range: xRange,
      visible: showAxes,
    },
    yaxis: {
      title: 'y',
      showgrid: showGrid,
      showline: showAxes,
      zeroline: showAxes,
      range: yRange,
      visible: showAxes,
    },
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
  };
};

export const createFunctionTrace = (
  x: number[],
  y: number[],
  state: PlotState,
  name: string = 'f(x)',
  color: string = '#1976d2'
) => {
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
) => {
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
) => {
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