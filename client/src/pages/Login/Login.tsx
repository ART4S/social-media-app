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
import Alert from "@material-ui/lab/Alert";

import Copyright from "components/Copyright/Copyright";
import PasswordField from "components/PasswordField/PasswordField";
import Links from "./Links/Links";
import useStyles from "./useStyles";
import useAppSelector from "hooks/useAppSelector";
import { actions, getErrors, getIsSubmitting } from "./loginSlice";
import * as yup from "yup";
import LoginVm from "model/login/loginVm";
import useAppDispatch from "hooks/useAppDispatch";
import { useHistory, useLocation } from "react-router-dom";
import { getUser } from "redux/commonSlice";

const SPACING = 2;

type FormValues = LoginVm & {
  rememberMe: boolean;
};

const initialValues: FormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = yup.object({
  email: yup.string().trim().required("Required"),
  password: yup.string().trim().required("Required"),
});

interface LoginLocationState {
  from?: Location;
}

export default function Login(): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const location = useLocation<LoginLocationState>();
  const history = useHistory();

  const isSubmitting = useAppSelector(getIsSubmitting);
  const isLoggedIn = useAppSelector((state) => !!getUser(state));
  const errors = useAppSelector(getErrors);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.replace(location.state?.from ?? "/");
      return () => {
        dispatch(actions.loginSucceed());
      };
    }
  }, [isLoggedIn, history, location]);

  function handleSubmit(values: LoginVm) {
    dispatch(actions.login(values));
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Box display="flex" justifyContent="center" mt={10}>
          <Avatar className={classes.avatar}>
            <LockOutlined className={classes.icon} />
          </Avatar>
        </Box>

        <Box display="flex" justifyContent="center" mt={SPACING}>
          <Typography className={classes.header} variant="h5">
            sign in
          </Typography>
        </Box>

        {!!errors.length && (
          <Box mt={SPACING}>
            {errors.map((error) => (
              <Alert severity="error" style={{ width: "100%" }}>
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
              <Form>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  helperText={touched.email && !!errors.email}
                  error={touched.email && !!errors.email}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />

                <Box mt={SPACING}>
                  <PasswordField
                    id="password"
                    label="Password"
                    value={values.password}
                    helperText={touched.password && !!errors.password}
                    error={touched.password && !!errors.password}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Box>

                <Box mt={SPACING}>
                  <FormControlLabel
                    id="rememberMe"
                    label="Remember me"
                    control={<Checkbox />}
                    value={values.rememberMe}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
