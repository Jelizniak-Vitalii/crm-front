import * as React from 'react';
import Box from '@mui/material/Box';

import { SideBarItems } from './side-bar-items.tsx';

export function SideBar(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        width: 'var(--SideBar-width)',
        bgcolor: 'var(var(--mui-palette-common-white))',
        color: 'var(--mui-palette-common-white)',
        borderRight: '1px solid var(--mui-palette-neutral-200)'
      }}
    >
      <SideBarItems/>
    </Box>
  );
}
