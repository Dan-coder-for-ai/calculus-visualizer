import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Slider,
} from '@mui/material';
import Plot from 'react-plotly.js';
import { useStore } from '../store/useStore';
import { generatePoints } from '../utils/math';
import { createBaseLayout, createFunctionTrace } from '../utils/plotting';

const FunctionPlot: React.FC = () => {
  const {
    functionInput,
    setFunctionInput,
    xRange,
    setXRange,
    yRange,
    setYRange,
    showGrid,
    toggleGrid,
    showAxes,
    toggleAxes,
    showPoints,
    togglePoints,
    lineWidth,
    setLineWidth,
    pointSize,
    setPointSize,
    addRecentFunction,
  } = useStore();

  const [plotData, setPlotData] = useState<any[]>([]);
  const [plotLayout, setPlotLayout] = useState<any>({});

  const plotState = {
    showGrid,
    showAxes,
    xRange,
    yRange,
    showPoints,
    lineWidth,
    pointSize,
  };

  useEffect(() => {
    try {
      const { x, y } = generatePoints(functionInput, xRange);
      const trace = createFunctionTrace(x, y, plotState);
      const layout = createBaseLayout(plotState);
      setPlotData([trace]);
      setPlotLayout({
        ...layout,
        autosize: true,
        height: 400,
        width: undefined
      });
    } catch (error) {
      console.error('Error generating plot:', error);
    }
  }, [functionInput, xRange, yRange, showGrid, showAxes, showPoints, lineWidth, pointSize]);

  const handlePlot = () => {
    addRecentFunction(functionInput);
  };

  const handleXRangeChange = (_: Event, newValue: number | number[]) => {
    setXRange(newValue as [number, number]);
  };

  const handleYRangeChange = (_: Event, newValue: number | number[]) => {
    setYRange(newValue as [number, number]);
  };

  const handleLineWidthChange = (_: Event, newValue: number | number[]) => {
    setLineWidth(newValue as number);
  };

  const handlePointSizeChange = (_: Event, newValue: number | number[]) => {
    setPointSize(newValue as number);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Function f(x)"
              value={functionInput}
              onChange={(e) => setFunctionInput(e.target.value)}
              placeholder="e.g., x^2, sin(x), etc."
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>X Range</Typography>
            <Slider
              value={xRange}
              onChange={handleXRangeChange}
              min={-10}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Y Range</Typography>
            <Slider
              value={yRange}
              onChange={handleYRangeChange}
              min={-10}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Line Width</Typography>
            <Slider
              value={lineWidth}
              onChange={handleLineWidthChange}
              min={1}
              max={5}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Point Size</Typography>
            <Slider
              value={pointSize}
              onChange={handlePointSizeChange}
              min={1}
              max={10}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showGrid}
                  onChange={toggleGrid}
                />
              }
              label="Show Grid"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAxes}
                  onChange={toggleAxes}
                />
              }
              label="Show Axes"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPoints}
                  onChange={togglePoints}
                />
              }
              label="Show Points"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handlePlot}>
              Plot Function
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ flex: 1, p: 2, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <Plot
          data={plotData}
          layout={plotLayout}
          style={{ width: '100%', height: '100%', minHeight: '400px' }}
          useResizeHandler={true}
          config={{ responsive: true }}
        />
      </Paper>
    </Box>
  );
};

export default FunctionPlot; 