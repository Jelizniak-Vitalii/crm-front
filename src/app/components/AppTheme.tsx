import AppThemeProvider from './AppThemeProvider.tsx';
import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';

const AppTheme = ({ children }: { children: ReactNode }) => {
  return (
    <AppThemeProvider>
      <CssBaseline />
      {children}
    </AppThemeProvider>
  );
};

export default AppTheme;
