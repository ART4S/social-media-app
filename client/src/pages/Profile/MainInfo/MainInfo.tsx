import React from "react";
import { Box, Avatar, Typography } from "@material-ui/core";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import useAppSelector from "hooks/useAppSelector";
import { actions, getProfile } from "../profileCommonSlice";
import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";
import EditButton from "components/Buttons/EditButton/EditButton";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import { getUser } from "pages/Login/loginSlice";

export default function MainInfo(): JSX.Element {
  const classes = useStyles();

  const profile: UserProfileDto = useAppSelector(getProfile);

  const isUserProfile = useAppSelector(
    (state) => getUser(state).id === getProfile(state).userId,
  );

  return (
    <Box display="flex">
      <Box display="flex">
        <Avatar className={classes.avatar} src={profile.avatarUrl} />

        <Box display="flex" flexDirection="column" ml={2}>
          <Typography className={classes.userName} variant="h6">
            {getUserName(profile)}
          </Typography>

          {isUserProfile && (
            <Typography className={classes.userEmail} variant="body2">
              {profile.email}
            </Typography>
          )}
        </Box>
      </Box>

      <Box flexGrow="1" />

      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <div>
          <EditButton />

          <DeleteButton />
        </div>
      </Box>
    </Box>
  );
}
