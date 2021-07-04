import React from "react";
import {
  Container,
  Box,
  Button,
  Avatar,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Formik, Form } from "formik";

import Links from "./Links/Links";
import Copyright from "../../components/Copyright/Copyright";
import PasswordField from "components/PasswordField/PasswordField";
import useStyles from "./useStyles";

export default function Login(): JSX.Element {
  const classes = useStyles();

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
                  <PasswordField
                    id="password"
                    label="Password"
                    variant="outlined"
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
