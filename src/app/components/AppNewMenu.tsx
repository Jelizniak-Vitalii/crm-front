import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { MainNav } from './MenuAndNavBar/main-nav.tsx';
import { SideNav } from './MenuAndNavBar/side-nav.tsx';
import AppRoutes from '../../main/components/AppRoutes.tsx';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../pages/Auth/slice/userSlice.ts';

const AppNewMenu = () => {
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
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        {isAuthenticated && <SideNav />}
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: isAuthenticated && 'var(--SideNav-width)' } }}>
          {isAuthenticated && <MainNav />}
          <main>
            <Container maxWidth="xl" sx={{ py: '64px', height: '100vh' }}>
              <AppRoutes />
            </Container>
          </main>
        </Box>
      </Box>
    </>
  );
};

export default AppNewMenu;
