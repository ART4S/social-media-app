import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

export default function Progress(
  props: React.ComponentProps<typeof CircularProgress>,
) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" {...props} />
    </Box>
  );
}
