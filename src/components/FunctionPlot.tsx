import React, { useState, useEffect, Suspense, lazy } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { useStore } from '../store/useStore';
import { generatePoints, evaluateFunction } from '../utils/mathUtils';
import { createBaseLayout, createFunctionTrace } from '../utils/plotting';

// Dynamically import Plotly
const Plot = lazy(() => import('react-plotly.js'));

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Try to initialize plot with a simple function
    if (!functionInput) {
      setFunctionInput('x^2');
    }
  }, []);

  const plotState = {
    showGrid,
    showAxes,
    xRange,
    yRange,
    showPoints,
    lineWidth,
    pointSize,
  };

  const updatePlot = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const points = generatePoints(functionInput, xRange[0], xRange[1]);
      if (!points || points.length === 0) {
        throw new Error('No valid points generated');
      }

      const yValues = points.map(point => evaluateFunction(functionInput, point));
      if (yValues.some(y => y === null || isNaN(y))) {
        throw new Error('Invalid function values');
      }

      const trace = createFunctionTrace(points, yValues, plotState);
      const layout = createBaseLayout(plotState);
      
      setPlotData([trace]);
      setPlotLayout({
        ...layout,
        width: undefined,
        height: undefined,
        autosize: true,
      });
      
      addRecentFunction(functionInput);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error plotting function');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted && functionInput.trim()) {
      updatePlot();
    }
  }, [isMounted, functionInput, xRange, yRange, showGrid, showAxes, showPoints, lineWidth, pointSize]);

  const handlePlot = () => {
    updatePlot();
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
              label="Enter function (e.g., x^2, sin(x), exp(x))"
              value={functionInput}
              onChange={(e) => setFunctionInput(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>X Range</Typography>
            <Slider
              value={xRange}
              onChange={handleXRangeChange}
              min={-20}
              max={20}
              step={0.1}
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Y Range</Typography>
            <Slider
              value={yRange}
              onChange={handleYRangeChange}
              min={-20}
              max={20}
              step={0.1}
              valueLabelDisplay="auto"
              sx={{ mb: 2 }}
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
            <Button 
              variant="contained" 
              onClick={handlePlot}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Plot Function'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ flex: 1, p: 2, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%' 
          }}>
            <CircularProgress />
          </Box>
        }>
          {isMounted && plotData.length > 0 ? (
            <Plot
              data={plotData}
              layout={plotLayout}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
              config={{ 
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
              }}
              onInitialized={() => {
                console.log('Plot initialized');
              }}
              onError={(err: Error) => {
                console.error('Plot error:', err);
                setError('Error rendering plot');
              }}
            />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: 'text.secondary'
            }}>
              <Typography>Enter a function and click "Plot Function" to visualize</Typography>
            </Box>
          )}
        </Suspense>
      </Paper>
    </Box>
  );
};

export default FunctionPlot; 