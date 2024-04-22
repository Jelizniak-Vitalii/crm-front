import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Spinner } from '@phosphor-icons/react';

import { useDispatch } from 'react-redux';
import { logout } from '../../../pages/Auth/slice/userSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../../../modules/User/UserApi.ts';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: currentUser, isFetching: isFetchingCurrentUser } = useGetCurrentUserQuery();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
    localStorage.removeItem('token');
  };

  return (
    <Popover anchorEl={anchorEl} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} onClose={onClose} open={open} slotProps={{ paper: { sx: { width: '240px' } } }}>
      {isFetchingCurrentUser ? (
        <Spinner />
      ) : (
        <Box sx={{ p: '16px 20px ' }}>
          <Typography variant="subtitle1">
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {currentUser.email}
          </Typography>
        </Box>
      )}

      <Divider />

      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={NavLink} to="profile" onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Профиль
        </MenuItem>

        <MenuItem component={NavLink} to="/settings" onClick={onClose}>
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
