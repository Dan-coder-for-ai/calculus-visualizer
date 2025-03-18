import { createTheme } from '@mui/material/styles';
import { useStore } from './store/useStore';

const getTheme = (isDarkMode: boolean) => createTheme({
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

export const theme = getTheme(false); // Default to light theme 