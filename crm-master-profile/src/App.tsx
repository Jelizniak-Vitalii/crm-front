import { Suspense, useState } from 'react';

import { createTheme, ThemeProvider, PaletteMode, Box } from '@mui/material';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppMenu, { DRAWER_WIDTH } from './app/components/AppMenu.tsx';
import AppRoutes from './main/components/AppRoutes.tsx';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme => ({
  main: {
    width: '100%',
    height: '100%',
    transitionDuration: `${theme.transitions.duration.standard}ms`,
    [theme.breakpoints.up('sm')]: {
      marginLeft: DRAWER_WIDTH.EXPANDED.sm,
      width: `calc(100% - ${DRAWER_WIDTH.EXPANDED.sm}px)`,
    },
    // TODO: добавить респонсив на медиум
    [theme.breakpoints.up('md')]: {
      marginLeft: DRAWER_WIDTH.EXPANDED.sm,
      width: `calc(100% - ${DRAWER_WIDTH.EXPANDED.sm}px)`,
    },
  },
  content: {
    width: '100%',
    height: '100%',

    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(3),
    },
  },
}));

function App() {
  const [mode] = useState<PaletteMode>('dark');

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppMenu />} />
          </Routes>

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
