import React from "react";
import { Box, Avatar, Typography, Grid, Link } from "@material-ui/core";
import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import useAppSelector from "hooks/useAppSelector";
import { getFollowingInfo } from "../followingsSectionSlice";
import { wrap } from "utils/stringUtils";
import type FollowingDto from "model/dto/following/FollowingDto";
import { getIsCurrentUserProfile } from "pages/Profile/profileSlice";
import FollowButton from "./FollowButton/FollowButton";
import NavLink from "components/NavLink/NavLink";

interface FollowingProps {
  followingId: string;
}

export default function Following({
  followingId,
}: FollowingProps): JSX.Element {
  const classes = useStyles();

  const following: FollowingDto = useAppSelector((state) =>
    getFollowingInfo(state, followingId),
  );

  const isCurrentUserProfile = useAppSelector(getIsCurrentUserProfile);

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center">
        <Avatar className={classes.avatar} src={following.avatarUrl} />
      </Box>

      <Box ml={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs>
            <NavLink to={following.userId}>
              <Link>{getUserName(following)}</Link>
            </NavLink>
          </Grid>

          <Grid item xs>
            <Typography variant="body2">
              {!!following.status && wrap(following.status, 50)}
            </Typography>
          </Grid>

          <Grid item xs>
            {isCurrentUserProfile && <FollowButton followingId={followingId} />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
