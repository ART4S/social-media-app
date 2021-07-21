import React from "react";
import { Typography } from "@material-ui/core";

export default function Title(): JSX.Element {
  return (
    <Typography style={{ textTransform: "uppercase" }} variant="h4" color="primary">
      edit profile
    </Typography>
  );
}
