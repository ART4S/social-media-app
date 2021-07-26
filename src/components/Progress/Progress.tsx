import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

export default function Progress(
  props: React.ComponentProps<typeof CircularProgress>,
): JSX.Element {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" {...props} />
    </Box>
  );
}
