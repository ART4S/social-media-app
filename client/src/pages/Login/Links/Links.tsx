import { Box, Typography, Link } from "@material-ui/core";
import Navigate from "components/Navigate/Navigate";

import useStyles from "./useStyles";

export default function Links() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-between">
      <Link className={classes.link}>
        <Typography variant="body2">Forgot password?</Typography>
      </Link>

      <Navigate to="/registration">
        <Link className={classes.link}>
          <Typography variant="body2">Sign up</Typography>
        </Link>
      </Navigate>
    </Box>
  );
}
