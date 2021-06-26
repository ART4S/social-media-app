import React from "react";
import {
  Container,
  Box,
  Paper,
  Button,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Collapse,
  Tabs,
  Tab,
} from "@material-ui/core";
import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import moment from "moment";
import { Formik, Form } from "formik";

import Links from "./Links/Links";
import Copyright from "./Copyright/Copyright";
import Header from "common/components/Header/Header";
import TabPanel from "common/components/TabPanel/TabPanel";
import PostList from "common/components/PostList/PostList";
import FollowList from "common/components/FollowList/FollowList";

import { getUserName } from "utils/userUtils";
import useStyles from "./useStyles";

export default function Login(): JSX.Element {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Box display="flex" justifyContent="center" mt={10}>
          <Avatar className={classes.avatar}>
            <LockOutlined className={classes.icon} />
          </Avatar>
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography className={classes.header} variant="h5">
            sign in
          </Typography>
        </Box>

        <Box mt={2}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, formik) => {
              formik.setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                />

                <Box mt={2}>
                  <TextField
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Box>

                <Box mt={2}>
                  <FormControlLabel
                    label="Remember me"
                    control={<Checkbox />}
                  />
                </Box>

                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    sign in
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        <Box mt={2}>
          <Links />
        </Box>

        <Box display="flex" justifyContent="center" mt={6}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
