import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useStore } from '../store/useStore';

const RecentFunctions: React.FC = () => {
  const { recentFunctions } = useStore();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Recent Functions
      </Typography>
      <List>
        {recentFunctions.map((func, index) => (
          <ListItem key={index}>
            <ListItemText primary={func} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentFunctions; 