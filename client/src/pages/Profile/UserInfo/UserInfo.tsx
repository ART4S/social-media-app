import React from "react";
import { Typography, Grid, GridSpacing } from "@material-ui/core";
import moment from "moment";

import useStyles from "./useStyles";
import IUserProfile from "model/dto/UserProfileDto";

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
