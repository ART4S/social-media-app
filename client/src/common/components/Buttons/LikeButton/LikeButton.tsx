import React from "react";
import { IconButton, Badge } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

import useStyles from "./useStyles";

type LikeButtonProps = {
  active: boolean;
};

export default function LikeButton({ active }: LikeButtonProps) {
  const classes = useStyles();

  return (
    <IconButton>
      <Badge classes={{ badge: classes.badge }} badgeContent={4}>
        {active ? (
          <Favorite className={classes.icon} />
        ) : (
          <FavoriteBorder className={classes.icon} />
        )}
      </Badge>
    </IconButton>
  );
}
