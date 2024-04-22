import * as React from 'react';
import Box from '@mui/material/Box';

import { SideBarItems } from './side-bar-items.tsx';

export function SideBar(): React.JSX.Element {
  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-common-white)',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--SideNav-background)',
        borderRight: '1px solid var(--mui-palette-neutral-200)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        width: 'var(--SideNav-width)',
        maxWidth: '100%',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <SideBarItems/>
    </Box>
  );
}
