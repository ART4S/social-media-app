import { Box, Typography, Link } from "@material-ui/core";

import useStyles from "./useStyles";

export default function Links() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-between">
      <Link className={classes.link}>
        <Typography variant="body2">Forgot password?</Typography>
      </Link>

      <Link className={classes.link}>
        <Typography variant="body2">Sign up</Typography>
      </Link>
    </Box>
  );
}
