import React from "react";
import { Button } from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getProfile } from "pages/Profile/profileSlice";

export default function FollowButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const isFollow: boolean = useAppSelector(
    (state) => getProfile(state).isCurrentUserFollow,
  );

  return (
    <Button
      variant={isFollow ? "outlined" : "contained"}
      color="primary"
      style={{ textTransform: "none" }}
      onClick={() => dispatch(actions.toggleFollowProfile())}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
  );
}
