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
    overflow: 'scroll'
  },
}));

const AppMenu = () => {
  const { classes } = useStyles();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--SideNav-width': '230px',
            '--MobileNav-width': '320px',
          }
        }}
      />
      <Box
        sx={{
          // bgcolor: 'var(--mui-palette-common-white)',
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          position: 'relative',
          minHeight: '100%',
          height: '100%'
        }}
      >
        {isAuthenticated && <SideBar />}
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          {isAuthenticated && <MainNav />}
          <main className={classes.main}>
            <AppRoutes />
          </main>
        </Box>
      </Box>
    </>
  );
};

export default AppMenu;
