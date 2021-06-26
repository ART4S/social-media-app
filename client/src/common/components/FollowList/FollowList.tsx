import React from "react";
import { Grid } from "@material-ui/core";
import Follow from "../Follow/Follow";
import type IUser from "model/User";

import useStyles from "./useStyles";

type FollowListProps = {
  data: IUser[];
};

export default function FollowList({ data }: FollowListProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {data.map((x) => (
        <Grid key={x.id} item xs={4}>
          <Follow className={classes.follower} data={x} />
        </Grid>
      ))}
    </Grid>
  );
}
