import React from "react";
import { Button } from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import { getIsFollow } from "../../followingsSectionSlice";

interface FollowButtonProps {
  followingId: string;
  onClick: () => void;
}

export default function FollowButton({
  followingId,
  onClick,
}: FollowButtonProps): JSX.Element {
  const isFollow: boolean = useAppSelector((state) =>
    getIsFollow(state, followingId),
  );

  return (
    <Button
      variant={isFollow ? "outlined" : "contained"}
      color="primary"
      style={{ textTransform: "none" }}
      onClick={onClick}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
  );
}
