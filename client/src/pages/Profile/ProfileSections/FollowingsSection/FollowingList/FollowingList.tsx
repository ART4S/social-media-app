import React from "react";
import { Grid } from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getFollowingIds } from "../followingsSectionSlice";
import Following from "../Following/Following";

export default function FollowingList(): JSX.Element {
  const followingIds: string[] = useAppSelector(getFollowingIds);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchFollowings());
  }, []);

  return (
    <Grid container direction="column" spacing={5}>
      {followingIds.map((id) => (
        <Grid key={id} item xs>
          <Following followingId={id} />
        </Grid>
      ))}
    </Grid>
  );
}
