import React from 'react';
import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Avatar, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Skeleton, Toolbar, Typography } from '@mui/material';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from 'tss-react/mui';
import { useDispatch } from 'react-redux';
import { logout } from '../../pages/Auth/slice/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../../modules/User/UserApi.ts';

const useStyles = makeStyles()(theme => ({
  switch: {
    marginRight: theme.spacing(1.7),
  },
  listIcon: {
    fontSize: 16,
  },
}));

interface AppBarProps extends MuiAppBarProps {
  onToggleDrawer?: () => void;
}

function AppBar({ children, onToggleDrawer }: AppBarProps) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // TODO: добавить данные юзера
  const user = {
    firstName: 'Vanya',
    lastName: 'moldovan',
  };

  const { classes } = useStyles();

  const { data: currentUser, isFetching: isFetchingCurrentUser } = useGetCurrentUserQuery();

  const [avatarEl, setAvatarEl] = React.useState<HTMLButtonElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(event.currentTarget);
  };

  const handleAvatarPopoverClose = () => {
    setAvatarEl(null);
  };

  const handleLogout = () => {
    navigate('/login', { replace: true });
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onToggleDrawer} sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            {children}
          </Grid>

          <Grid item>
            <Typography>{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
          </Grid>

          <Grid item>
            <IconButton onClick={handleAvatarClick}>
              {isFetchingCurrentUser ? <Skeleton variant="circular" animation="wave" width={40} height={40} /> : <Avatar variant="circular" />}
            </IconButton>

            <Menu
              anchorEl={avatarEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(avatarEl)}
              onClose={handleAvatarPopoverClose}
            >
              {/*//TODO: добавить переключатель светлой/темной темы*/}
              {/*<MenuItem onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>*/}
              {/*  <Switch className={classes.switch} onChange={(event, checked) => setMode(checked ? 'light' : 'dark')} checked={mode === 'light'} size="small" />*/}
              {/*  <ListItemText>{mode === 'light' ? t('DEFAULT:ACTION.LIGHT-MODE') : t('DEFAULT:ACTION.DARK-MODE')}</ListItemText>*/}
              {/*</MenuItem>*/}
              {/*//TODO: добавить переключатель языка*/}
              {/*<MenuItem onClick={handleLanguageModalOpen}>*/}
              {/*  <ListItemIcon className={classes.listIcon}>*/}
              {/*    <Public />*/}
              {/*  </ListItemIcon>*/}
              {/*  <ListItemText>{t('DEFAULT:ACTION.SWITCH-LANGUAGE')}</ListItemText>*/}
              {/*</MenuItem>*/}

              <MenuItem key="profile" onClick={() => navigate('profile', { replace: true })}>
                <ListItemIcon className={classes.listIcon}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>Мой профиль</ListItemText>
              </MenuItem>

              <MenuItem key="settings" onClick={() => navigate('settings', { replace: true })}>
                <ListItemIcon className={classes.listIcon}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Настройки</ListItemText>
              </MenuItem>

              <MenuItem key="logout" onClick={() => handleLogout()}>
                <ListItemIcon className={classes.listIcon}>
                  <Logout />
                </ListItemIcon>
                <ListItemText>Выйти</ListItemText>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
