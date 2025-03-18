import { Layout } from 'plotly.js-dist';

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
    margin: { t: 40, r: 20, b: 40, l: 60 },
    showlegend: true,
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
  
  // If there are no valid points, return an empty trace
  if (x.length === 0 || y.length === 0) {
    return {
      x: [],
      y: [],
      name,
      type: 'scatter',
      mode: 'lines',
      line: { color, width: lineWidth },
      marker: { size: pointSize, color },
    };
  }

  return {
    x,
    y,
    name,
    type: 'scatter',
    mode: showPoints ? 'lines+markers' : 'lines',
    line: {
      color,
      width: lineWidth,
      shape: 'linear',
    },
    marker: {
      size: pointSize,
      color,
      line: {
        color: '#fff',
        width: 1,
      },
    },
    hoverinfo: 'x+y',
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