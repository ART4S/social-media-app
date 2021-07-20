import logo from "assets/logo.png";
import NavLink from "components/NavLink/NavLink";

import useStyles from "./useStyles";

export default function Logo(): JSX.Element {
  const classes = useStyles();

  return (
    <NavLink to="/">
      <img className={classes.logo} src={logo} />
    </NavLink>
  );
}
