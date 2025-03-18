import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout';
import FunctionPlot from './components/FunctionPlot';
import Derivatives from './components/Derivatives';
import HigherDerivatives from './components/HigherDerivatives';
import Integrals from './components/Integrals';
import RecentFunctions from './components/RecentFunctions';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<FunctionPlot />} />
            <Route path="/derivatives" element={<Derivatives />} />
            <Route path="/higher-derivatives" element={<HigherDerivatives />} />
            <Route path="/integrals" element={<Integrals />} />
            <Route path="/recent" element={<RecentFunctions />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App; 