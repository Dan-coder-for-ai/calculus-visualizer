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
import { generatePoints, calculateHigherDerivative } from '../utils/math';
import { createBaseLayout, createFunctionTrace } from '../utils/plotting';
import * as Plotly from 'plotly.js-dist';

const HigherDerivatives: React.FC = () => {
  const plotRef = useRef<HTMLDivElement>(null);
  const [xValue, setXValue] = useState(0);
  const [hValue, setHValue] = useState(0.0001);
  const [order, setOrder] = useState(2);
  const [showOriginal, setShowOriginal] = useState(true);
  const [derivativeValue, setDerivativeValue] = useState<number | null>(null);

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

  const handleCalculateDerivative = () => {
    if (plotRef.current) {
      const derivative = calculateHigherDerivative(functionInput, xValue, hValue, order);
      setDerivativeValue(derivative);

      const traces = [];
      if (showOriginal) {
        const { x, y } = generatePoints(functionInput, xRange);
        traces.push(createFunctionTrace(x, y, plotState, 'Original Function'));
      }

      const { x, y } = generatePoints(
        `(${functionInput})'${order > 1 ? `'${order - 1}` : ''}`,
        xRange
      );
      traces.push(createFunctionTrace(x, y, plotState, `${order}${order === 1 ? 'st' : order === 2 ? 'nd' : 'th'} Derivative`));

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
            <Typography gutterBottom>Point x</Typography>
            <TextField
              fullWidth
              type="number"
              value={xValue}
              onChange={(e) => setXValue(parseFloat(e.target.value))}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Step Size (h)</Typography>
            <TextField
              fullWidth
              type="number"
              value={hValue}
              onChange={(e) => setHValue(parseFloat(e.target.value))}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Derivative Order</Typography>
            <Slider
              value={order}
              onChange={(_, newValue) => setOrder(newValue as number)}
              min={1}
              max={5}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showOriginal}
                  onChange={(e) => setShowOriginal(e.target.checked)}
                />
              }
              label="Show Original Function"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleCalculateDerivative}>
              Calculate Derivative
            </Button>
          </Grid>
          {derivativeValue !== null && (
            <Grid item xs={12}>
              <Typography variant="h6">
                f{order === 1 ? "'" : `'${order}`}({xValue}) = {derivativeValue.toFixed(4)}
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

export default HigherDerivatives; 