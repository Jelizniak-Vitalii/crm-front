import { DRAWER_STATES } from '../appConstants.ts';
import { forwardRef, ReactNode } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink, NavLinkProps, useMatch } from 'react-router-dom';
import { cx } from '@emotion/css';

export const DRAWER_WIDTH = {
  [DRAWER_STATES.TOGGLED]: {
    sm: 80,
    md: 80,
  },
  [DRAWER_STATES.EXPANDED]: {
    sm: 240,
    md: 300,
  },
};

//TODO: добавить иконки и убрать тип undefined
const mainMenuItems: { label: string; icon?: ReactNode; to: string; subRoute?: string }[] = [
  {
    label: 'Dashboard',
    // icon: <CreativesIcon height={ICON_HEIGHT} width={ICON_WIDTH} />,
    to: 'dashboard',
    subRoute: '/dashboard/*',
  },
  {
    label: 'Registration',
    // icon: <CampaignsIcon height={ICON_HEIGHT} width={ICON_WIDTH} />,
    to: 'registration',

    subRoute: '/registration/*',
  },
  {
    label: 'Feed',
    // icon: <CreativesIcon height={ICON_HEIGHT} width={ICON_WIDTH} />,
    to: 'feed',
    subRoute: '/feed/*',
  },
];

const ActiveNavLink = forwardRef<
  HTMLAnchorElement,
  NavLinkProps & {
    subRoute?: string;
  }
>(function SelectableNavLink({ className, subRoute, ...props }, ref) {
  const match = useMatch(subRoute ?? '');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <NavLink ref={ref} {...props} className={({ isActive }) => (isActive || (subRoute && match) ? cx(className, 'Mui-selected') : className)} />;
});

const AppMenu = () => {
  const handleClickMenuItem = (to: string) => {
    return () => console.log('to', to);
  };

  const drawer = (
    <List component="nav">
      {mainMenuItems.map(({ label, subRoute, to }) => (
        <ListItem key={label}>
          <ListItemButton component={ActiveNavLink} to={to} subRoute={subRoute} onClick={handleClickMenuItem(to)}>
            {/*<ListItemIcon >{icon}</ListItemIcon>*/}
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH.EXPANDED.sm },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
};

export default AppMenu;
