/* eslint-disable @typescript-eslint/no-shadow */
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
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { Formik, Form } from "formik";
import moment from "moment";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import Copyright from "components/Copyright/Copyright";
import PasswordField from "components/PasswordField/PasswordField";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import type RegistrationVm from "model/registration/registrationVm";
import NavLink from "components/NavLink/NavLink";
import { getUser } from "redux/commonSlice";

import { actions, getErrors, getIsSubmitting } from "./registrationSlice";
import useStyles from "./useStyles";

const SPACING = 2;

type FormValues = RegistrationVm & {
  passwordConfirm: string;
};

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  password: "",
  passwordConfirm: "",
};

const today = moment().format("YYYY-MM-DD");

const validationSchema = yup.object({
  firstName: yup.string().trim().required("Required").max(50),
  lastName: yup.string().trim().required("Required").max(50),
  dateOfBirth: yup.date().required("Required").max(today),
  email: yup.string().trim().required("Required"),
  password: yup.string().trim().required("Required"),
  passwordConfirm: yup
    .string()
    .trim()
    .required("Required")
    .oneOf([yup.ref("password"), ""], "Passwords don't match"),
});

export default function Registration(): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isSubmitting = useAppSelector(getIsSubmitting);
  const isLoggedIn = useAppSelector((state) => !!getUser(state));
  const errors = useAppSelector(getErrors);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
      return () => {
        dispatch(actions.registerUserSucceed());
      };
    }
  }, [isLoggedIn, history]);

  function handleSubmit(values: FormValues) {
    dispatch(actions.registerUser(values));
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Box display="flex" justifyContent="center">
          <Avatar className={classes.avatar}>
            <LockOutlined className={classes.icon} />
          </Avatar>
        </Box>

        <Box display="flex" justifyContent="center" mt={SPACING}>
          <Typography style={{ textTransform: "capitalize" }} variant="h5">
            sign up
          </Typography>
        </Box>

        {!!errors.length && (
          <Box mt={SPACING}>
            {errors.map((error, index) => (
              <Alert key={index} severity="error" style={{ width: "100%" }}>
                {error}
              </Alert>
            ))}
          </Box>
        )}

        <Box mt={SPACING}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, touched, errors, handleChange, handleBlur }) => (
              <Form autoComplete="off">
                <Grid container spacing={SPACING}>
                  <Grid item xs>
                    <TextField
                      id="firstName"
                      label="First name"
                      variant="outlined"
                      value={values.firstName}
                      helperText={touched.firstName && errors.firstName}
                      error={touched.firstName && !!errors.firstName}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      id="lastName"
                      label="Last name"
                      variant="outlined"
                      value={values.lastName}
                      helperText={touched.lastName && errors.lastName}
                      error={touched.lastName && !!errors.lastName}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>

                <Box mt={SPACING}>
                  <TextField
                    id="dateOfBirth"
                    label="Date of birth"
                    type="date"
                    variant="outlined"
                    value={values.dateOfBirth}
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                    error={touched.dateOfBirth && !!errors.dateOfBirth}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={touched.email && !!errors.email}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <PasswordField
                    id="password"
                    label="Password"
                    variant="outlined"
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={touched.password && !!errors.password}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <PasswordField
                    id="passwordConfirm"
                    label="Repeat password"
                    variant="outlined"
                    value={values.passwordConfirm}
                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                    error={touched.passwordConfirm && !!errors.passwordConfirm}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    sign up
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={SPACING}>
          <NavLink to="/login">
            <Link className={classes.link}>
              <Typography variant="body2">Already have an account? Sign in</Typography>
            </Link>
          </NavLink>
        </Box>

        <Box display="flex" justifyContent="center" mt={6}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
