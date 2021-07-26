import React from "react";
import { Grid } from "@material-ui/core";

import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

import { actions, getFollowerIds } from "../followersSectionSlice";
import Follower from "../Follower/Follower";

export default function FollowerList(): JSX.Element {
  const dispatch = useAppDispatch();

  const followerIds: string[] = useAppSelector(getFollowerIds);

  React.useEffect(() => {
    dispatch(actions.fetchFollowers());
  }, []);

  return (
    <Grid container direction="column" spacing={5}>
      {followerIds.map((id) => (
        <Grid key={id} item xs>
          <Follower followerId={id} />
        </Grid>
      ))}
    </Grid>
  );
}
