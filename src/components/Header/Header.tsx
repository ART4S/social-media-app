import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import NavLink from "components/NavLink/NavLink";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import Avatar from "components/Avatar/Avatar";
import { getUser } from "redux/commonSlice";
import { getUserName } from "utils/userUtils";
import { actions as loginActions } from "pages/Login/loginSlice";

import Logo from "./Logo/Logo";
import useStyles from "./useStyles";

function HideOnScroll({ children }: { children: React.ReactElement }): JSX.Element {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  return (
    <HideOnScroll>
      <AppBar>
        <Container maxWidth="md">
          <Toolbar>
            <Logo />

            <Box flexGrow="1" />

            <NavLink to={user.id}>
              <Box display="flex" alignItems="center">
                <Typography>{getUserName(user)}</Typography>

                <Box ml={1}>
                  <Avatar src={user.avatarUrl} />
                </Box>
              </Box>
            </NavLink>

            <IconButton onClick={() => dispatch(loginActions.logout())}>
              <ExitToAppIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
