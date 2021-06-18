import {
  AppBar,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    icon: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      fill: theme.palette.common.white,
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
