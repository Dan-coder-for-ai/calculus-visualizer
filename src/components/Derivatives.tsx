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
} from '@mui/material';
import { useStore } from '../store/useStore';
import { generatePoints, calculateDerivative, evaluateFunction } from '../utils/math';
import { createBaseLayout, createFunctionTrace, createTangentLineTrace } from '../utils/plotting';
import * as Plotly from 'plotly.js-dist';

const Derivatives: React.FC = () => {
  const plotRef = useRef<HTMLDivElement>(null);
  const [xValue, setXValue] = useState(0);
  const [hValue, setHValue] = useState(0.0001);
  const [showTangent, setShowTangent] = useState(true);
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
      const derivative = calculateDerivative(functionInput, xValue, hValue);
      setDerivativeValue(derivative);

      const { x, y } = generatePoints(functionInput, xRange);
      const traces = [createFunctionTrace(x, y, plotState)];

      if (showTangent && !isNaN(derivative)) {
        const tangentX = [xValue - 1, xValue + 1];
        const tangentY = [
          evaluateFunction(functionInput, xValue) - derivative,
          evaluateFunction(functionInput, xValue) + derivative,
        ];
        traces.push(createTangentLineTrace(tangentX, tangentY));
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={showTangent}
                  onChange={(e) => setShowTangent(e.target.checked)}
                />
              }
              label="Show Tangent Line"
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
                f'({xValue}) = {derivativeValue.toFixed(4)}
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

export default Derivatives; 