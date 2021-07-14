import React from "react";
import { Box, Avatar, Typography, Grid, Link, Button } from "@material-ui/core";
import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import {
  actions,
  getFollowingInfo,
  getIsFollow,
} from "../followingsSectionSlice";
import { wrap } from "utils/stringUtils";
import FollowingDto from "model/dto/users/FollowingDto";

interface FollowingProps {
  followingId: string;
}

export default function Following({
  followingId,
}: FollowingProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const following: FollowingDto = useAppSelector((state) =>
    getFollowingInfo(state, followingId),
  );

  const isFollow: boolean = useAppSelector((state) =>
    getIsFollow(state, followingId),
  );

  function handleFollowClick() {
    dispatch(actions.toggleFollow(followingId));
  }

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center">
        <Avatar className={classes.avatar} src={following.avatarUrl} />
      </Box>

      <Box ml={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs>
            <Link>{getUserName(following)}</Link>
          </Grid>

          <Grid item xs>
            <Typography variant="body2">
              {!!following.status && wrap(following.status, 50)}
            </Typography>
          </Grid>

          <Grid item xs>
            {isFollow ? (
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={handleFollowClick}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={handleFollowClick}
              >
                Follow
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
