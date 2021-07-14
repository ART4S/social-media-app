import React from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  Avatar,
  Link,
  TextField,
  Typography,
  GridSpacing,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Formik, Form } from "formik";

import Copyright from "components/Copyright/Copyright";
import PasswordField from "components/PasswordField/PasswordField";
import useStyles from "./useStyles";

const SPACING: GridSpacing = 2;

export default function Registration(): JSX.Element {
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
            sign up
          </Typography>
        </Box>

        <Box mt={2}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              passwordRepeat: "",
            }}
            onSubmit={(values, formik) => {
              formik.setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={SPACING}>
                  <Grid item xs>
                    <TextField
                      id="firstName"
                      label="First name"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      id="lastName"
                      label="Last name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Box mt={SPACING}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <PasswordField
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <PasswordField
                    id="passwordRepeat"
                    label="Repeat password"
                    variant="outlined"
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    sign up
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Link className={classes.link}>
            <Typography variant="body2">
              Already have an account? Sign in
            </Typography>
          </Link>
        </Box>

        <Box display="flex" justifyContent="center" mt={6}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
