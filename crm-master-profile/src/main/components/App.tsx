import { Suspense, useState } from 'react';

import { createTheme, ThemeProvider, PaletteMode, Box } from '@mui/material';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppMenu, { DRAWER_WIDTH } from '../../app/components/AppMenu.tsx';
import AppRoutes from './AppRoutes.tsx';
import { makeStyles } from 'tss-react/mui';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../pages/Auth/slice/userSlice.ts';

const useStyles = makeStyles<{ isAuthenticated: boolean }>()((theme, { isAuthenticated }) => ({
  main: {
    width: '100%',
    height: '100%',
    transitionDuration: `${theme.transitions.duration.standard}ms`,
    [theme.breakpoints.up('sm')]: {
      marginLeft: isAuthenticated ? DRAWER_WIDTH.EXPANDED.sm : 0,
      width: isAuthenticated ? `calc(100% - ${DRAWER_WIDTH.EXPANDED.sm}px)` : '100%',
    },
    // TODO: добавить респонсив на медиум
    [theme.breakpoints.up('md')]: {
      marginLeft: isAuthenticated ? DRAWER_WIDTH.EXPANDED.sm : 0,
      width: isAuthenticated ? `calc(100% - ${DRAWER_WIDTH.EXPANDED.sm}px)` : '100%',
    },
  },
  content: {
    width: '100%',
    height: '100%',

    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: isAuthenticated ? theme.spacing(2) : 0,
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: isAuthenticated ? theme.spacing(3) : 0,
    },
  },
}));

function App() {
  const [mode] = useState<PaletteMode>('dark');

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const { classes } = useStyles({ isAuthenticated });

  return (
    <ThemeProvider theme={darkTheme}>
      <Suspense fallback={null}>
        <BrowserRouter>
          {isAuthenticated && (
            <Routes>
              <Route path="/*" element={<AppMenu />} />
            </Routes>
          )}

          <Box className={classes.main}>
            <Box className={classes.content}>
              <AppRoutes />
            </Box>
          </Box>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
