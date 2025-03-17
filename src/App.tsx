import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import FunctionPlot from './components/FunctionPlot';
import Derivatives from './components/Derivatives';
import Integrals from './components/Integrals';
import HigherDerivatives from './components/HigherDerivatives';
import { createTheme } from '@mui/material/styles';

const App: React.FC = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FunctionPlot />} />
            <Route path="derivatives" element={<Derivatives />} />
            <Route path="integrals" element={<Integrals />} />
            <Route path="higher-derivatives" element={<HigherDerivatives />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 