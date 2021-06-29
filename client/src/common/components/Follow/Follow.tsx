import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  IconButton,
  Grid,
  Link,
  Button,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import cn from "classnames";

import faker from "faker";

import type IUser from "model/User";
import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";

type FollowProps = {
  className?: string;
  data: IUser;
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

{
  /* <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" height="66%">
          <Link>{getUserName(data)}</Link>
          <Typography variant="body2">{faker.lorem.words()}</Typography>
        </Box>

        <Box height="34%">
          <Button style={{ textTransform: "none" }}>Follow</Button>
        </Box>
      </Box> */
}

{
  //   <Grid container>
  //   <Grid item xs={2}>
  //     <Avatar className={classes.avatar} src={data.avatarUrl} />
  //   </Grid>
  //   <Grid container direction="column" xs={9} spacing={1}>
  //     <Grid item xs>
  //       <Link>{getUserName(data)}</Link>
  //     </Grid>
  //     <Grid item xs>
  //       <Typography variant="body2">{faker.lorem.words()}</Typography>
  //     </Grid>
  //     <Grid item xs>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         style={{ textTransform: "none" }}
  //       >
  //         Follow
  //       </Button>
  //     </Grid>
  //   </Grid>
  // </Grid>
}
