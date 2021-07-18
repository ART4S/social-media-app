import React from "react";
import { Box, Avatar, Typography, Grid, Link, Button } from "@material-ui/core";
import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getFollowerInfo, getBlocked } from "../followersSectionSlice";
import { wrap } from "utils/stringUtils";
import FollowerDto from "model/dto/users/FollowerDto";
import { getIsCurrentUserProfile } from "pages/Profile/profileSlice";
import { getUser } from "pages/commonSlice";
import Navigate from "components/Navigate/Navigate";

interface FollowingProps {
  followerId: string;
}

export default function Follower({ followerId }: FollowingProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const follower: FollowerDto = useAppSelector((state) =>
    getFollowerInfo(state, followerId),
  );

  const blocked: boolean = useAppSelector((state) =>
    getBlocked(state, followerId),
  );

  const isCurrentUserProfile = useAppSelector(getIsCurrentUserProfile);

  function handleBlockFollower() {
    dispatch(actions.blockFollower(followerId));
  }

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center">
        <Avatar className={classes.avatar} src={follower.avatarUrl} />
      </Box>

      <Box ml={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs>
            <Navigate to={follower.followerId}>
              <Link>{getUserName(follower)}</Link>
            </Navigate>
          </Grid>

          <Grid item xs>
            <Typography variant="body2">
              {!!follower.status && wrap(follower.status, 50)}
            </Typography>
          </Grid>

          <Grid item xs>
            {isCurrentUserProfile &&
              (blocked ? (
                <Typography variant="body2" color="textSecondary">
                  user was blocked
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={handleBlockFollower}
                >
                  Block
                </Button>
              ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
