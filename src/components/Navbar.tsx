import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useStore } from '../store/useStore';

interface NavbarProps {
  onMenuClick: () => void;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onThemeToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDarkMode, toggleTheme } = useStore();

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Calculus Visualizer
        </Typography>
        <IconButton color="inherit" onClick={onThemeToggle}>
          {isDarkMode ? '🌞' : '🌙'}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 