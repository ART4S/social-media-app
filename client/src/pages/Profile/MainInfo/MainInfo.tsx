import React from "react";
import { Box, Avatar, Typography } from "@material-ui/core";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";
import useAppSelector from "hooks/useAppSelector";
import DeleteButton from "components/Buttons/DeleteButton/DeleteButton";
import EditButton from "components/Buttons/EditButton/EditButton";
import UserProfileDto from "model/dto/userProfile/UserProfileDto";
import DeleteProfileDialog from "../DeleteProfileDialog/DeleteProfileDialog";
import { getIsCurrentUserProfile, getProfile } from "../profileSlice";
import NavLink from "components/NavLink/NavLink";
import FollowButton from "./FollowButton/FollowButton";

export default function MainInfo(): JSX.Element {
  const classes = useStyles();

  const profile: UserProfileDto = useAppSelector(getProfile);

  const isCurrentUserProfile = useAppSelector(getIsCurrentUserProfile);

  const [open, setOpen] = React.useState(false);

  return (
    <Box display="flex">
      <Box display="flex">
        <Avatar className={classes.avatar} src={profile.avatarUrl} />

        <Box display="flex" flexDirection="column" ml={2}>
          <Typography className={classes.userName} variant="h6">
            {getUserName(profile)}
          </Typography>

          {isCurrentUserProfile && (
            <Typography className={classes.userEmail} variant="body2">
              {profile.email}
            </Typography>
          )}
        </Box>
      </Box>

      <Box flexGrow="1" />

      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        {isCurrentUserProfile ? (
          <div>
            <NavLink
              to={{
                pathname: `${profile.userId}/edit`,
                state: {
                  profileId: profile.id,
                },
              }}
            >
              <EditButton />
            </NavLink>

            <DeleteButton onClick={() => setOpen(true)} />
          </div>
        ) : (
          <FollowButton />
        )}
      </Box>

      <DeleteProfileDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
