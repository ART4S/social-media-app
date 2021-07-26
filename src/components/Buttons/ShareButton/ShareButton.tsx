import React from "react";
import { IconButton, Badge } from "@material-ui/core";
import { Chat, ChatOutlined } from "@material-ui/icons";

import useStyles from "./useStyles";

type ShareButtonProps = {
  active: boolean;
  shareCount: number;
  onClick: () => void;
};

export default function ShareButton({
  active,
  shareCount,
  onClick,
}: ShareButtonProps): JSX.Element {
  const classes = useStyles();

  return (
    <IconButton onClick={onClick}>
      <Badge classes={{ badge: classes.badge }} badgeContent={shareCount}>
        {active ? <Chat className={classes.icon} /> : <ChatOutlined className={classes.icon} />}
      </Badge>
    </IconButton>
  );
}
