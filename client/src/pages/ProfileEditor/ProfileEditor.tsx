import React from "react";
import { Container, Box, Paper, Button, TextField } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

import Header from "components/Header/Header";
import { useFormik } from "formik";
import useStyles from "./useStyles";
import Title from "./Title/Title";
import Avatar from "components/Avatar/Avatar";
import {
  actions,
  getIsSubmitting,
  getLoading,
  getProfile,
} from "./profileEditorSlice";
import useAppSelector from "hooks/useAppSelector";
import PageProgress from "components/PageProgress/PageProgress";
import useAppDispatch from "hooks/useAppDispatch";
import UserProfileEditDto from "model/dto/userProfiles/UserProfileEditDto";
import * as yup from "yup";
import { useLocation } from "react-router-dom";

interface ProfileEditorLocationState {
  profileId: string;
}

export default function ProfileEditor(): JSX.Element {
  const dispatch = useAppDispatch();

  // TODO: check state before navigation
  const { profileId } = useLocation<ProfileEditorLocationState>().state;

  const loading = useAppSelector(getLoading);

  React.useEffect(() => {
    dispatch(actions.fetchProfile(profileId));
  }, [profileId]);

  return loading ? <PageProgress /> : <PageContent />;
}

const validationSchema = yup.object({
  firstName: yup.string().trim().required().max(50),
  lastName: yup.string().trim().required().max(50),
  dateOfBirth: yup.date().max(new Date()),
  avatarUrl: yup.string().notRequired(),
  about: yup.string().notRequired().max(800),
});

function PageContent(): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const profile = useAppSelector(getProfile);

  const initialValues: UserProfileEditDto = {
    ...profile,
  };

  const isSubmitting = useAppSelector(getIsSubmitting);

  const { values, touched, errors, dirty, isValid, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit() {
      dispatch(actions.saveProfile(values));
    },
  });

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("avatarUrl", URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <Header />

      <Box mt={12}>
        <Container maxWidth="sm">
          <Paper>
            <Box display="flex" justifyContent="center" p={6}>
              <Title />
            </Box>

            <Box display="flex" justifyContent="center">
              <Avatar className={classes.avatar} src={values.avatarUrl} />
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
              <input
                id="upload-image"
                form="form"
                type="file"
                accept="image/png"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />

              <label htmlFor="upload-image">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  upload image
                </Button>
              </label>
            </Box>

            <Box mt={2}>
              <form
                id="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
              >
                <Box display="flex" flexDirection="column" p={2}>
                  <TextField
                    id="firstName"
                    label="First name"
                    variant="outlined"
                    value={values.firstName}
                    helperText={touched.firstName && errors.firstName}
                    error={touched.firstName && !!errors.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                  />

                  <Box mt={2}>
                    <TextField
                      id="lastName"
                      label="Last name"
                      variant="outlined"
                      value={values.lastName}
                      helperText={touched.lastName && errors.lastName}
                      error={touched.lastName && !!errors.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                    />
                  </Box>

                  <Box mt={2}>
                    <TextField
                      id="about"
                      label="About"
                      variant="outlined"
                      rowsMax={10}
                      value={values.about}
                      helperText={touched.about && errors.about}
                      error={touched.about && !!errors.about}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      multiline
                      fullWidth
                    />
                  </Box>

                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      cancel
                    </Button>

                    <Box ml={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!(dirty && isValid && !isSubmitting)}
                      >
                        save
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}
