import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'light') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0B3954',
        light: '#4F8CB6',
        dark: '#082940',
      },
      secondary: {
        main: '#82B7DC',
        light: '#A4CEE8',
        dark: '#5B80B9',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 500 },
      button: { textTransform: 'none' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });
}; 