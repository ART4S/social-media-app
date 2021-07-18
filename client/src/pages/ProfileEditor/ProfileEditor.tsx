import React from "react";
import {
  Container,
  Box,
  Paper,
  Button,
  TextField,
  Avatar,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

import Header from "components/Header/Header";
import { useFormik } from "formik";
import useStyles from "./useStyles";
import Title from "./Title/Title";
import {
  actions,
  getIsSubmitting,
  getSubmitted,
  getLoaded,
  getProfile,
} from "./profileEditorSlice";
import useAppSelector from "hooks/useAppSelector";
import PageProgress from "components/PageProgress/PageProgress";
import useAppDispatch from "hooks/useAppDispatch";
import UserProfileEditDto from "model/dto/userProfiles/UserProfileEditDto";
import * as yup from "yup";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { PhotoCameraOutlined } from "@material-ui/icons";
import moment from "moment";

const SPACING = 2;

interface ProfileEditorLocationState {
  profileId: string;
}

const today = format();

function format(date?: string) {
  return moment(date).format("YYYY-MM-DD");
}

const validationSchema = yup.object({
  firstName: yup.string().trim().required("Required").max(50),
  lastName: yup.string().trim().required("Required").max(50),
  dateOfBirth: yup.date().required("Required").max(today),
  avatarUrl: yup.string().notRequired(),
  about: yup.string().notRequired().max(800),
});

export default function ProfileEditor(): JSX.Element {
  const { state } = useLocation<ProfileEditorLocationState>();

  if (!state) {
    return <Redirect to="*" />;
  }

  const { profileId } = state;

  const dispatch = useAppDispatch();

  const loaded = useAppSelector(getLoaded);

  React.useEffect(() => {
    dispatch(actions.fetchProfile(profileId));
  }, [profileId]);

  return loaded ? <PageContent /> : <PageProgress />;
}

function PageContent(): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const history = useHistory();

  const profile = useAppSelector(getProfile);

  const initialValues: UserProfileEditDto = {
    ...profile,
    dateOfBirth: format(profile.dateOfBirth),
  };

  const isSubmitting = useAppSelector(getIsSubmitting);

  const submitted = useAppSelector(getSubmitted);

  React.useEffect(() => {
    if (submitted) {
      history.goBack();
      dispatch(actions.reset());
    }
  }, [submitted]);

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
              <Avatar className={classes.avatar} src={values.avatarUrl}>
                <PhotoCameraOutlined className={classes.avatarIcon} />
              </Avatar>
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
                    disabled={isSubmitting}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                  />

                  <Box mt={SPACING}>
                    <TextField
                      id="lastName"
                      label="Last name"
                      variant="outlined"
                      value={values.lastName}
                      helperText={touched.lastName && errors.lastName}
                      error={touched.lastName && !!errors.lastName}
                      disabled={isSubmitting}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                    />
                  </Box>

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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  </Box>

                  <Box mt={SPACING}>
                    <TextField
                      id="about"
                      label="About"
                      variant="outlined"
                      rowsMax={10}
                      value={values.about}
                      helperText={touched.about && errors.about}
                      error={touched.about && !!errors.about}
                      disabled={isSubmitting}
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
                      onClick={() => history.goBack()}
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
