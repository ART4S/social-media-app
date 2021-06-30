import React from "react";
import { Box, Avatar, Typography, Grid, Link, Button } from "@material-ui/core";
import faker from "faker";

import type User from "model/UserDto";
import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";

type FollowProps = {
  className?: string;
  data: User;
};

export default function Follow({ data }: FollowProps): JSX.Element {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center">
        <Avatar className={classes.avatar} src={data.avatarUrl} />
      </Box>

      <Box ml={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs>
            <Link>{getUserName(data)}</Link>
          </Grid>

          <Grid item xs>
            <Typography variant="body2">{faker.lorem.words()}</Typography>
          </Grid>

          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
            >
              Follow
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
