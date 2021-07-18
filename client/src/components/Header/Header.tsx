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
import Navigate from "components/Navigate/Navigate";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { getUser } from "redux/commonSlice";

import { actions as loginActions } from "pages/Login/loginSlice";

import useStyles from "./useStyles";

function Logo(): JSX.Element {
  return (
    <Navigate to="/">
      <Typography>Logo</Typography>
    </Navigate>
  );
}

export default function Header(): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => getUser(state).id);

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar>
          <Logo />

          <Box flexGrow="1" />

          <IconButton>
            <Navigate to={userId}>
              <AccountCircle className={classes.icon} />
            </Navigate>
          </IconButton>

          <IconButton onClick={() => dispatch(loginActions.logout())}>
            <ExitToAppIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
