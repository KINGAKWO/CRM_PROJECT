import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

const LoadingOverlay = ({ open, message }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
        gap: 2 
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      {message && (
        <Typography variant="body1">{message}</Typography>
      )}
    </Backdrop>
  );
};

export default LoadingOverlay; 