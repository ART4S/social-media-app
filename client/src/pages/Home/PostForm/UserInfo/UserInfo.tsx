import React from "react";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import Avatar from "components/Avatar/Avatar";
import useAppSelector from "hooks/useAppSelector";
import { getUserName } from "utils/userUtils";
import { getUser } from "pages/commonSlice";

export default function UserInfo(): JSX.Element {
  const user = useAppSelector(getUser);

  return (
    <Box display="flex">
      <Avatar src={user.avatarUrl} />

      <Box display="flex" alignItems="center" ml={2}>
        <Typography align="center">{getUserName(user)}</Typography>
      </Box>
    </Box>
  );
}
