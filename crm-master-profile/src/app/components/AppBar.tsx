import React from 'react';
import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Avatar, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import { useDispatch } from 'react-redux';
import { logout } from '../../pages/Auth/slice/userSlice.ts';

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
  // TODO: добавить данные юзера
  const user = {
    firstName: 'Vanya',
    lastName: 'moldovan',
  };
  const { classes } = useStyles();

  const [avatarEl, setAvatarEl] = React.useState<HTMLButtonElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(event.currentTarget);
  };

  const handleAvatarPopoverClose = () => {
    setAvatarEl(null);
  };

  const handleLogout = () => {
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
            <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
          </Grid>

          <Grid item>
            <IconButton onClick={handleAvatarClick}>
              <Avatar variant="circular" />
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
              <MenuItem onClick={() => handleLogout()}>
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
