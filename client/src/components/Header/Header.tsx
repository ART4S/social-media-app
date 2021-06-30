import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import useStyles from "./useStyles";

function Logo(): JSX.Element {
  return <Typography>Hello</Typography>;
}

export default function Header(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar>
          <Logo />

          <Box flexGrow="1" />

          <IconButton>
            <AccountCircle className={classes.icon} />
          </IconButton>

          <IconButton>
            <ExitToAppIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
