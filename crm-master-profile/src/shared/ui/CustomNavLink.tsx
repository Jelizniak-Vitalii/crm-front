import { NavLink, NavLinkProps } from 'react-router-dom';
import { Link } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  link: {
    textDecoration: 'none',
  },
}));

type CustomNavLinkProps = NavLinkProps & {
  linkText: string;
  underline: 'hover' | 'none' | 'always' | undefined;
};

const CustomNavLink = ({ to, linkText }: CustomNavLinkProps) => {
  const { classes } = useStyles();

  return (
    <NavLink to={to} className={classes.link}>
      <Link underline="hover">{linkText}</Link>
    </NavLink>
  );
};

export default CustomNavLink;
