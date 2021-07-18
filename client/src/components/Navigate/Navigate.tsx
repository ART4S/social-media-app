import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./useStyles";

export default function Navigate(props: React.ComponentProps<typeof Link>) {
  const classes = useStyles();
  return <Link className={classes.link} {...props} />;
}
