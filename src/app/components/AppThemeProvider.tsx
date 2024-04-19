import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import theme from '../../theme/theme.ts';

const defaultTheme = createTheme({
  palette: { mode: 'dark' },
});

type AppThemeProvider = {
  children: ReactNode;
  // mode: PaletteMode;
};

const AppThemeProvider = ({ children }: AppThemeProvider) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
