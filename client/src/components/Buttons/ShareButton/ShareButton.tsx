import React from "react";
import { IconButton, Badge } from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import useStyles from "./useStyles";

export default function ShareButton() {
  const classes = useStyles();

  return (
    <IconButton>
      <Badge classes={{ badge: classes.badge }} badgeContent={4}>
        <Chat className={classes.icon} />
      </Badge>
    </IconButton>
  );
}
