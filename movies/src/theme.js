import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode: 'light', 
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#f5f5f5',
      },
      text: {
        primary: '#333333',
        secondary: '#757575',
      },
    },

    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h1: {
        fontSize: '2.5rem',
      },
      h2: {
        fontSize: '2rem',
      },
      body1: {
        fontSize: '1rem',
      },
    },
    
    breakpoints:{
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },  
    },
    
  });
  
  export default theme;
