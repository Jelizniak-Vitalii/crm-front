import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import { MainNav } from './MenuAndNavBar/main-nav.tsx';
import AppRoutes from '../../main/components/AppRoutes.tsx';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../pages/Auth/slice/userSlice.ts';
import { makeStyles } from 'tss-react/mui';
import { SideBar } from './MenuAndNavBar/side-bar.tsx';

const useStyles = makeStyles()(() => ({
  main: {
    height: '100%',
  },
}));

const AppNewMenu = () => {
  const { classes } = useStyles();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          }
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
          height: '100%'
        }}
      >
        {isAuthenticated && <SideBar />}
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: isAuthenticated && 'var(--SideNav-width)' } }}>
          {isAuthenticated && <MainNav />}
          <main className={classes.main}>
            <AppRoutes />
          </main>
        </Box>
      </Box>
    </>
  );
};

export default AppNewMenu;
