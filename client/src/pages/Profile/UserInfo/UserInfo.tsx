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

import Header from "components/Header/Header";
import TabPanel from "components/TabPanel/TabPanel";
import PostList from "components/PostList/PostList";
import FollowList from "components/FollowList/FollowList";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import posts from "mock/posts";
import profiles from "mock/userProfiles";
import users from "mock/users";
import IUserProfile from "model/UserProfileDto";

const SPACING: GridSpacing = 1;

type UserInfoProps = {
  profile: IUserProfile;
};

export default function UserInfo({ profile }: UserInfoProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={SPACING}>
      <Grid container item spacing={SPACING}>
        <Grid item xs={3}>
          <Typography className={classes.typo}>Date of birth:</Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="body2">
            {moment(profile.dateOfBirth).format("LL").toLocaleLowerCase()}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item spacing={SPACING}>
        <Grid item xs={3}>
          <Typography className={classes.typo}>About:</Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="body2">{profile.about}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
