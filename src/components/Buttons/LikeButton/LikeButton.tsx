import React from "react";
import { IconButton, Badge } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

import useStyles from "./useStyles";

type LikeButtonProps = {
  active: boolean;
  likeCount: number;
  onClick: () => void;
};

export default function LikeButton({ active, likeCount, onClick }: LikeButtonProps): JSX.Element {
  const classes = useStyles();

  return (
    <IconButton onClick={onClick}>
      <Badge classes={{ badge: classes.badge }} badgeContent={likeCount}>
        {active ? (
          <Favorite className={classes.icon} />
        ) : (
          <FavoriteBorder className={classes.icon} />
        )}
      </Badge>
    </IconButton>
  );
}
