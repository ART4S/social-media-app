import { Box, Typography, Link } from "@material-ui/core";

import useStyles from "./useStyles";

export default function Links() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-between">
      <Link className={classes.link}>
        <Typography>Forgot password?</Typography>
      </Link>

      <Link className={classes.link}>
        <Typography className={classes.typo}>sign up</Typography>
      </Link>
    </Box>
  );
}
