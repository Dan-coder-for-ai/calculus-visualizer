import React, { useEffect, useRef } from 'react';
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
import { useStore } from '../store/useStore';
import { generatePoints } from '../utils/math';
import { createBaseLayout, createFunctionTrace } from '../utils/plotting';
import * as Plotly from 'plotly.js-dist';

const FunctionPlot: React.FC = () => {
  const plotRef = useRef<HTMLDivElement>(null);
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
    if (plotRef.current) {
      const { x, y } = generatePoints(functionInput, xRange);
      const trace = createFunctionTrace(x, y, plotState);
      const layout = createBaseLayout(plotState);

      Plotly.newPlot(plotRef.current, [trace], layout);
    }
  }, [functionInput, xRange, yRange, showGrid, showAxes, showPoints, lineWidth, pointSize]);

  const handlePlot = () => {
    addRecentFunction(functionInput);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>X Range</Typography>
            <Slider
              value={xRange}
              onChange={(_, newValue) => setXRange(newValue as [number, number])}
              valueLabelDisplay="auto"
              min={-10}
              max={10}
              step={0.1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Y Range</Typography>
            <Slider
              value={yRange}
              onChange={(_, newValue) => setYRange(newValue as [number, number])}
              valueLabelDisplay="auto"
              min={-10}
              max={10}
              step={0.1}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox checked={showGrid} onChange={toggleGrid} />}
              label="Show Grid"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox checked={showAxes} onChange={toggleAxes} />}
              label="Show Axes"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox checked={showPoints} onChange={togglePoints} />}
              label="Show Points"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Line Width</Typography>
            <Slider
              value={lineWidth}
              onChange={(_, newValue) => setLineWidth(newValue as number)}
              min={1}
              max={5}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Point Size</Typography>
            <Slider
              value={pointSize}
              onChange={(_, newValue) => setPointSize(newValue as number)}
              min={2}
              max={10}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handlePlot}>
              Plot Function
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ flex: 1, p: 2 }}>
        <div ref={plotRef} style={{ width: '100%', height: '100%' }} />
      </Paper>
    </Box>
  );
};

export default FunctionPlot; 