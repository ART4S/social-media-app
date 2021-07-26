import React from "react";
import { Button } from "@material-ui/core";

import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

import { actions, getIsFollow } from "../../followingsSectionSlice";

type FollowButtonProps = {
  followingId: string;
};

export default function FollowButton({ followingId }: FollowButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isFollow: boolean = useAppSelector((state) => getIsFollow(state, followingId));

  return (
    <Button
      variant={isFollow ? "outlined" : "contained"}
      color="primary"
      style={{ textTransform: "none" }}
      onClick={() => dispatch(actions.toggleFollow(followingId))}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
  );
}
