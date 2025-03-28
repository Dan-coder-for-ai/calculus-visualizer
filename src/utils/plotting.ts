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

export const createBaseLayout = (state: PlotState) => ({
  title: 'Function Plot',
  xaxis: {
    title: 'x',
    range: state.xRange,
    showgrid: state.showGrid,
    showline: state.showAxes,
    zeroline: state.showAxes,
  },
  yaxis: {
    title: 'y',
    range: state.yRange,
    showgrid: state.showGrid,
    showline: state.showAxes,
    zeroline: state.showAxes,
  },
  showlegend: false,
  autosize: true,
  margin: { t: 40, b: 40, l: 40, r: 40 },
});

export const createFunctionTrace = (x: number[], y: number[], state: PlotState) => ({
  x,
  y,
  type: 'scatter',
  mode: state.showPoints ? 'lines+markers' : 'lines',
  line: { 
    color: '#1976d2',
    width: state.lineWidth 
  },
  marker: {
    size: state.pointSize,
    color: '#1976d2'
  }
});

export const createTangentLineTrace = (x: number[], y: number[], name: string = 'Tangent Line') => ({
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
});

export const createAreaTrace = (x: number[], y: number[], name: string = 'Area') => ({
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
}); 