import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

const defaultTheme = createTheme({
  palette: { mode: 'dark' },
});

type AppThemeProvider = {
  children: ReactNode;
  // mode: PaletteMode;
};

const AppThemeProvider = ({ children }: AppThemeProvider) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
