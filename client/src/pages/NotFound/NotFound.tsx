import { Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import useStyles from "./useStyles";

export default function NotFound(): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <Typography className={classes.title} variant="h1">
        not found
      </Typography>

      <Link className={classes.link} to="/">
        <Typography>back to homepage</Typography>
      </Link>
    </Box>
  );
}
