import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

type AppThemeProvider = {
  children: ReactNode;
  // mode: PaletteMode;
};

const AppThemeProvider = ({ children }: AppThemeProvider) => {
  return <ThemeProvider theme={createTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
