import * as React from 'react';
import Drawer from '@mui/material/Drawer';

import { SideBarItems } from './side-bar-items.tsx';

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

export function SideBarMobile({ open, onClose }: MobileNavProps): React.JSX.Element {
  return (
    <Drawer
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          width: 'var(--SideBar-width)',
          bgcolor: 'var(var(--mui-palette-common-white))',
          color: 'var(--mui-palette-common-white)',
          borderRight: '1px solid var(--mui-palette-neutral-200)'
        },
      }}
      onClose={onClose}
      open={open}
    >
      <SideBarItems/>
    </Drawer>
  );
}
