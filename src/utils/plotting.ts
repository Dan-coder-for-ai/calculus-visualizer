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

export const createBaseLayout = (plotState: any) => ({
  title: 'Function Plot',
  xaxis: {
    title: 'x',
    range: plotState.xRange,
    showgrid: plotState.showGrid,
    showline: plotState.showAxes,
    zeroline: plotState.showAxes,
  },
  yaxis: {
    title: 'y',
    range: plotState.yRange,
    showgrid: plotState.showGrid,
    showline: plotState.showAxes,
    zeroline: plotState.showAxes,
  },
  showlegend: false,
  autosize: true,
  margin: { t: 40, b: 40, l: 40, r: 40 },
});

export const createFunctionTrace = (x: number[], y: number[], plotState: any) => ({
  x,
  y,
  type: 'scatter',
  mode: 'lines',
  line: { color: '#1976d2' },
});

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