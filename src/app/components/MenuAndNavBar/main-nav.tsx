import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { UserPopover } from './user-popover';
import { usePopover } from '../../../hooks/use-popover.ts';
import { SideBarMobile } from './side-bar-mobile.tsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../pages/Auth/slice/userSlice.ts';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const currentUser = useSelector(selectCurrentUser);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Tooltip title="Search">
              <IconButton>
                <MagnifyingGlassIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Tooltip title="Contacts">
              <IconButton>
                <UsersIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Avatar
              ref={userPopover.anchorRef}
              alt="avatar"
              onClick={userPopover.handleOpen}
              src={currentUser?.image ?? '/assets/avatar.png'}
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>

      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />

      <SideBarMobile
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
