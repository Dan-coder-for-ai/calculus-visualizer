import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Functions as FunctionsIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const drawerWidth = 240;

const menuItems = [
  { text: 'Function Plot', icon: <FunctionsIcon />, path: '/' },
  { text: 'Derivatives', icon: <TimelineIcon />, path: '/derivatives' },
  { text: 'Higher Derivatives', icon: <TimelineIcon />, path: '/higher-derivatives' },
  { text: 'Integrals', icon: <BarChartIcon />, path: '/integrals' },
  { text: 'Recent Functions', icon: <HistoryIcon />, path: '/recent' },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { recentFunctions } = useStore();

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <img
          src="/logo.png"
          alt="Calculus Visualizer Logo"
          style={{ width: '100%', maxWidth: '200px' }}
        />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) onDrawerToggle();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {recentFunctions.length > 0 && (
        <>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="Recent Functions" />
            </ListItem>
            {recentFunctions.map((func) => (
              <ListItem key={func} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate('/');
                    if (isMobile) onDrawerToggle();
                  }}
                >
                  <ListItemText primary={func} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar; 