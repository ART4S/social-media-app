import React from "react";
import { Box, Typography } from "@material-ui/core";
import EditButton from "components/Buttons/EditButton/EditButton";
import useAppSelector from "hooks/useAppSelector";
import {
  getIsCurrentUserProfile,
  getProfile,
} from "pages/Profile/profileSlice";

interface ViewStatusProps {
  onEdit(): void;
}

export default function ViewStatus({ onEdit }: ViewStatusProps): JSX.Element {
  const status = useAppSelector((state) => getProfile(state).status);

  const isCurrentUserProfile = useAppSelector(getIsCurrentUserProfile);

  return (
    <Box display="flex" alignItems="center" maxWidth="100%">
      <Box flexGrow="1">
        {status ? (
          <Typography style={{ overflowWrap: "anywhere" }}>{status}</Typography>
        ) : (
          isCurrentUserProfile && (
            <Typography variant="body2" color="textSecondary">
              Set status
            </Typography>
          )
        )}
      </Box>

      {/* <Box flexGrow="1" /> */}

      {isCurrentUserProfile && <EditButton onClick={onEdit} />}
    </Box>
  );
}
