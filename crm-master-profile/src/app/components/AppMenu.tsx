import { DRAWER_STATES } from '../appConstants.ts';
import { forwardRef, ReactNode } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
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
const mainMenuItems: { label: string; icon?: ReactNode; to: string; roles?: string[]; subRoute?: string }[] = [
  {
    label: 'Dashboard',
    // icon: <Icon/>,
    to: 'dashboard',
    subRoute: '/dashboard/*',
  },
  {
    label: 'Calendar',
    // icon: <Icon/>,
    to: 'calendar',
    subRoute: '/calendar/*',
  },
  {
    label: 'Orders',
    // icon: <Icon/>,
    to: 'orders',
    subRoute: '/orders/*',
  },
  {
    label: 'Services',
    // icon: <Icon/>,
    to: 'services',
    subRoute: '/services/*',
  },
  {
    label: 'Customers',
    // icon: <Icon/>,
    to: 'customers',
    subRoute: '/customers/*',
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
    <List dense component="nav">
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
    <Box component="nav">
      <Drawer
        variant="permanent"
        ModalProps={{
          disablePortal: true,
        }}
        PaperProps={{
          elevation: 0,
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppMenu;
