import React from "react";
import {
  Container,
  Box,
  Paper,
  Button,
  Avatar,
  Divider,
  IconButton,
  Typography,
  Link,
  Grid,
  Collapse,
  Tabs,
  Tab,
  GridSpacing,
} from "@material-ui/core";
import { Edit, Delete, KeyboardArrowDown } from "@material-ui/icons";
import moment from "moment";

import Header from "common/components/Header/Header";
import TabPanel from "common/components/TabPanel/TabPanel";
import PostList from "common/components/PostList/PostList";
import FollowList from "common/components/FollowList/FollowList";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import posts from "mock/posts";
import profiles from "mock/userProfiles";
import users from "mock/users";
import IUserProfile from "model/UserProfile";

const SPACING: GridSpacing = 1;

type UserInfoProps = {
  profile: IUserProfile;
};

export default function UserInfo({ profile }: UserInfoProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={SPACING}>
      <Grid item container spacing={SPACING}>
        <Grid item>
          <Typography className={classes.typo}>Joined:</Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2">
            {moment(profile.joined).format("LL").toLocaleLowerCase()}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container spacing={SPACING}>
        <Grid item>
          <Typography className={classes.typo}>About:</Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2">{profile.about}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
