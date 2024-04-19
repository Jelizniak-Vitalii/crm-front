import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f4c75', // Темно-синий
      light: '#3282b8', // Голубой
      dark: '#1b262c', // Темный синий
      contrastText: '#bbe1fa', // Белый для контраста
    },
    secondary: {
      main: '#f8b400', // Оранжевый
      light: '#ffb200', // Светло-оранжевый
      dark: '#b78600', // Темно-оранжевый
      contrastText: '#000000', // Черный для контраста
    },
    error: {
      main: '#ff1654', // Красный
      light: '#ff6b81', // Светло-красный
      dark: '#c80037', // Темно-красный
      contrastText: '#ffffff', // Белый для контраста
    },
    warning: {
      main: '#ffd523', // Желтый
      light: '#fff176', // Светло-желтый
      dark: '#c7a500', // Темно-желтый
      contrastText: '#000000', // Черный для контраста
    },
    info: {
      main: '#00bfa5', // Зеленый
      light: '#5df2d6', // Светло-зеленый
      dark: '#008e76', // Темно-зеленый
      contrastText: '#ffffff', // Белый для контраста
    },
    success: {
      main: '#32cb00', // Зеленый
      light: '#6eff4b', // Светло-зеленый
      dark: '#009f00', // Темно-зеленый
      contrastText: '#ffffff', // Белый для контраста
    },
    background: {
      default: '#000000', // Черный фон
      paper: '#0a192f', // Темно-синий фон
    },
    text: {
      primary: '#ffffff', // Белый текст
      secondary: '#a8dadc', // Светло-голубой текст
    },
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '0.75rem',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '0.25rem',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '0.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
