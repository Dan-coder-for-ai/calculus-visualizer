import React, { useEffect, useRef, useState } from 'react';
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
import { generatePoints, calculateIntegral } from '../utils/math';
import { createBaseLayout, createFunctionTrace, createAreaTrace } from '../utils/plotting';
import * as Plotly from 'plotly.js-dist';

const Integrals: React.FC = () => {
  const plotRef = useRef<HTMLDivElement>(null);
  const [aValue, setAValue] = useState(-1);
  const [bValue, setBValue] = useState(1);
  const [nValue, setNValue] = useState(100);
  const [showArea, setShowArea] = useState(true);
  const [integralValue, setIntegralValue] = useState<number | null>(null);

  const {
    functionInput,
    setFunctionInput,
    xRange,
    yRange,
    showGrid,
    showAxes,
    showPoints,
    lineWidth,
    pointSize,
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

  const handleCalculateIntegral = () => {
    if (plotRef.current) {
      const integral = calculateIntegral(functionInput, aValue, bValue, nValue);
      setIntegralValue(integral);

      const traces = [];
      const { x, y } = generatePoints(functionInput, xRange);
      traces.push(createFunctionTrace(x, y, plotState, 'Original Function'));

      if (showArea) {
        const areaX = x.filter((xi) => xi >= aValue && xi <= bValue);
        const areaY = y.filter((_, i) => x[i] >= aValue && x[i] <= bValue);
        traces.push(createAreaTrace(areaX, areaY, 'Area Under Curve'));
      }

      const layout = createBaseLayout(plotState);
      Plotly.react(plotRef.current, traces, layout);
    }
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
            <Typography gutterBottom>Lower Bound (a)</Typography>
            <TextField
              fullWidth
              type="number"
              value={aValue}
              onChange={(e) => setAValue(parseFloat(e.target.value))}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Upper Bound (b)</Typography>
            <TextField
              fullWidth
              type="number"
              value={bValue}
              onChange={(e) => setBValue(parseFloat(e.target.value))}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Number of Rectangles (n)</Typography>
            <Slider
              value={nValue}
              onChange={(_, newValue) => setNValue(newValue as number)}
              min={10}
              max={1000}
              step={10}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showArea}
                  onChange={(e) => setShowArea(e.target.checked)}
                />
              }
              label="Show Area Under Curve"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleCalculateIntegral}>
              Calculate Integral
            </Button>
          </Grid>
          {integralValue !== null && (
            <Grid item xs={12}>
              <Typography variant="h6">
                ∫<sub>{aValue}</sub><sup>{bValue}</sup> f(x) dx = {integralValue.toFixed(4)}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
      <Paper sx={{ flex: 1, p: 2 }}>
        <div ref={plotRef} style={{ width: '100%', height: '100%' }} />
      </Paper>
    </Box>
  );
};

export default Integrals; 