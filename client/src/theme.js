import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#0B2C6F',
      light: '#1a3a8a',
      dark: '#051e3e',
    },
    secondary: {
      main: '#D4A62A',
      light: '#e0b74e',
      dark: '#9d771a',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
    },
  },
  typography: {
    fontFamily: ['Cairo', 'sans-serif'].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 700 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0B2C6F',
    },
    secondary: {
      main: '#D4A62A',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

export { lightTheme, darkTheme };
