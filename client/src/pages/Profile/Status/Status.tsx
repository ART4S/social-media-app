import React from "react";
import { Box, Typography } from "@material-ui/core";
import EditButton from "components/Buttons/EditButton/EditButton";
import useAppSelector from "hooks/useAppSelector";
import { getProfile } from "../profileCommonSlice";

export default function Status(): JSX.Element {
  const status = useAppSelector((state) => getProfile(state).status);

  return (
    <Box display="flex" alignItems="center">
      <Typography>{status}</Typography>

      <EditButton />
    </Box>
  );
}
