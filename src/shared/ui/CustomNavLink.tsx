import { NavLink, NavLinkProps } from 'react-router-dom';
import { Link } from '@mui/material';
import { LinkProps } from '@mui/material/Link/Link';

type CustomNavLinkProps = LinkProps &
  NavLinkProps & {
    linkText: string;
    underline: 'hover' | 'none' | 'always' | undefined;
  };

const CustomNavLink = ({ to, linkText }: CustomNavLinkProps) => {
  return (
    <Link component={NavLink} underline="hover" to={to}>
      {linkText}
    </Link>
  );
};

export default CustomNavLink;
