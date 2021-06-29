import React from "react";
import { Grid } from "@material-ui/core";
import Follow from "../Follow/Follow";
import type IUser from "model/User";

type FollowListProps = {
  data: IUser[];
};

export default function FollowList({ data }: FollowListProps): JSX.Element {
  return (
    <Grid container direction="column" spacing={5}>
      {data.map((x) => (
        <Grid key={x.id} item xs>
          <Follow data={x} />
        </Grid>
      ))}
    </Grid>
  );
}
