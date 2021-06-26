import React from "react";
import { Box, Avatar, Typography, Paper, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import cn from "classnames";

import type IUser from "model/User";
import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";

type FollowProps = {
  className?: string;
  data: IUser;
};

export default function Follow({ className, data }: FollowProps): JSX.Element {
  const classes = useStyles();

  return (
    <Paper className={cn(className)} elevation={4}>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={1}
        py={3}
      >
        <Box position="absolute" top={3} right={3}>
          <IconButton className={classes.deleteButton} color="secondary">
            <Delete className={classes.deleteIcon} />
          </IconButton>
        </Box>

        <Avatar className={classes.avatar} src={data.avatarUrl} />

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography
            className={classes.userName}
            variant="body2"
            align="center"
          >
            {getUserName(data)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
