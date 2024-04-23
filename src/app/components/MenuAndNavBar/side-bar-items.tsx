import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { NavIcons, navIcons } from './nav-icons.tsx';
import { makeStyles } from 'tss-react/mui';

const sideMenuItems: SideMenuItem[] = [
  { key: 'dashboard', title: 'Главная', href: '/dashboard', icon: NavIcons.ChartPie },
  { key: 'services', title: 'Услуги', href: '/services', icon: NavIcons.Services },
  // { key: 'profile', title: 'Профиль', href: '/profile', icon: NavIcons.User },
  // { key: 'settings', title: 'Settings', href: '/settings', icon: NavIcons.GearSix },
];

interface SideMenuItem {
  key: string;
  title: string;
  href: string;
  icon: NavIcons;
  disabled?: boolean;
  external?: boolean;
}

interface SideMenuItemProps extends SideMenuItem {
  pathname: string;
}

const useStyles = makeStyles()(() => ({
  item: {
    display: 'flex',
    gap: 10,
    borderRadius: 10,
    color: 'var(--mui-palette-neutral-600)',
    cursor: 'pointer',
    padding: '6px 16px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
    '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
    '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
    '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
    '&.active': {
      color: 'var(--mui-palette-primary-contrastText)',
      backgroundColor: 'var(--mui-palette-primary-main)'
    },
    '&:not(.active):hover': {
      backgroundColor: 'var(--mui-palette-action-hover)'
    }
  },
  title: {
    color: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '28px'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {}
}));

function NavItem({ disabled, external, href, icon, pathname, title }: SideMenuItemProps): React.JSX.Element {
  const { classes } = useStyles();

  const active = !disabled && pathname === href;
  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <Box
        className={classes.item}
        {...(href
          ? {
              component: external ? 'a' : NavLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
              to: href,
            }
          : { role: 'button' })}
        sx={{
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            pointerEvents: 'none',
          })
        }}
      >
        <Box className={classes.iconContainer}>
          {Icon ? <Icon className={classes.icon} fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'} fontSize="var(--icon-fontSize-md)" weight={active ? 'fill' : undefined} /> : null}
        </Box>
        <Box>
          <Typography component="span" className={classes.title}>
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}

function renderSideBarItems({ items = [], pathname }: { items?: SideMenuItem[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: SideMenuItem): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

export function SideBarItems(): React.JSX.Element {
  const { pathname } = useLocation();

  return (
    <Box component="nav" sx={{ p: '12px' }}>
      {renderSideBarItems({ pathname, items: sideMenuItems })}
    </Box>
  );
}
