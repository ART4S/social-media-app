import {
  AppBar,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Container,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
  })
);

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
          <div className={classes.grow} />
          <AccountCircle />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
