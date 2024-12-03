import React, { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

const LazyLoad = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoad; 