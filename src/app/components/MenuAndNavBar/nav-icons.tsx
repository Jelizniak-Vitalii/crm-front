import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export enum NavIcons {
  User = 'user',
  Users = 'users',
  ChartPie = 'chart-pie',
  GearSix = 'gear-six',
  PlusConnected = 'plugs-connected',
  XSquare = 'x-square'
}

export const navIcons: Record<NavIcons, Icon> = {
  [NavIcons.ChartPie]: ChartPieIcon,
  [NavIcons.GearSix]: GearSixIcon,
  [NavIcons.PlusConnected]: PlugsConnectedIcon,
  [NavIcons.XSquare]: XSquare,
  [NavIcons.User]: UserIcon,
  [NavIcons.Users]: UsersIcon
};
