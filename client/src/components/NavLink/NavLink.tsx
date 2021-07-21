import React from "react";
import { Link } from "react-router-dom";

import useStyles from "./useStyles";

export default function NavLink(props: React.ComponentProps<typeof Link>): JSX.Element {
  const classes = useStyles();
  return <Link className={classes.link} {...props} />;
}
