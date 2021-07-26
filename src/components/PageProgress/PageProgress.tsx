import React from "react";
import { Box } from "@material-ui/core";

import Progress from "components/Progress/Progress";

export default function PageProgress(): JSX.Element {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Progress />
    </Box>
  );
}
