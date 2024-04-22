import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { isNavItemActive } from '../../../lib/is-nav-item-active.ts';
import { NavIcons, navIcons } from './nav-icons.tsx';

const sideMenuItems = [
  { key: 'dashboard', title: 'Dashboard', href: '/dashboard', icon: NavIcons.ChartPie },
  { key: 'profile', title: 'Profile', href: '/profile', icon: NavIcons.User },
  { key: 'settings', title: 'Settings', href: '/settings', icon: NavIcons.GearSix }
];

interface SideMenuItem {
  key: string;
  title: string;
  href: string;
  icon: NavIcons;
}

interface SideMenuItemProps extends SideMenuItem {
  pathname: string;
  disabled?: boolean;
  external?: boolean;
  matcher?: string;
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }: SideMenuItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <Box
        {...(href
          ? {
            component: external ? 'a' : NavLink,
            href,
            target: external ? '_blank' : undefined,
            rel: external ? 'noreferrer' : undefined,
            to: href
          }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' })
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {Icon ? <Icon fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'} fontSize="var(--icon-fontSize-md)" weight={active ? 'fill' : undefined} /> : null}
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography component="span" sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}>
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
    <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
      {renderSideBarItems({ pathname, items: sideMenuItems })}
    </Box>
  );
}
