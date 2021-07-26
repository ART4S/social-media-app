import React from "react";
import { Link, Typography } from "@material-ui/core";

export default function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit">Social Media App</Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}
