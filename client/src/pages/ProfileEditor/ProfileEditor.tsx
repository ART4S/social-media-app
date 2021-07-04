import React from "react";
import {
  Container,
  Box,
  Paper,
  Button,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";
import { PhotoCameraOutlined, CloudUpload } from "@material-ui/icons";

import Header from "components/Header/Header";

import { useFormik, Form } from "formik";

import useStyles from "./useStyles";

import faker from "faker";

export default function ProfileEditor(): JSX.Element {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      about: "",
      avatar: {
        url: "",
        file: "",
      },
    },
    validate(values) {
      const a = 1;
    },
    onSubmit(values, helpers) {
      helpers.setSubmitting(false);
    },
  });

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("avatar", {
        url: URL.createObjectURL(file),
        file,
      });
    }
  }

  return (
    <div>
      <Header />

      <Box mt={12}>
        <Container maxWidth="sm">
          <Paper>
            <Box display="flex" justifyContent="center" p={6}>
              <Typography
                className={classes.header}
                variant="h4"
                color="primary"
              >
                edit profile
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center">
              <Avatar
                className={classes.avatar}
                src={formik.values.avatar.url || faker.image.imageUrl()}
                variant="rounded"
              >
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
                    fullWidth
                  />

                  <Box mt={2}>
                    <TextField
                      id="lastName"
                      label="Last name"
                      variant="outlined"
                      fullWidth
                    />
                  </Box>

                  <Box mt={2}>
                    <TextField
                      id="abount"
                      label="About"
                      variant="outlined"
                      rowsMax={10}
                      multiline
                      fullWidth
                    />
                  </Box>

                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button type="submit" color="primary" variant="contained">
                      save
                    </Button>
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
