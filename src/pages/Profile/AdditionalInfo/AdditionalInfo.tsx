import React from "react";
import { Typography, Grid, GridSpacing } from "@material-ui/core";
import moment from "moment";

import useAppSelector from "hooks/useAppSelector";
import { capitalizeFirstLetter } from "utils/stringUtils";

import { getProfile } from "../profileSlice";

import useStyles from "./useStyles";

const SPACING: GridSpacing = 1;

export default function AdditionalInfo(): JSX.Element {
  const classes = useStyles();

  const dateOfBirth = useAppSelector((state) => getProfile(state).dateOfBirth);

  const about = useAppSelector((state) => getProfile(state).about);

  return (
    <Grid container spacing={SPACING}>
      <Grid container item spacing={SPACING}>
        <Grid item xs={3}>
          <Typography className={classes.typo}>Date of birth:</Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="body2">
            {capitalizeFirstLetter(moment(dateOfBirth).format("LL").toLocaleLowerCase())}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item spacing={SPACING}>
        <Grid item xs={3}>
          <Typography className={classes.typo}>About:</Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="body2">{about}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
