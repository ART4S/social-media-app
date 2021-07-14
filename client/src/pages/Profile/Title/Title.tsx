import React from "react";
import { Typography } from "@material-ui/core";

import useStyles from "./useStyles";

export default function Title(): JSX.Element {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h4" color="primary">
      profile
    </Typography>
  );
}
