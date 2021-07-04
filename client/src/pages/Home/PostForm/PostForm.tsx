import React from "react";
import { Paper, Box, TextField, Button, IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AddAPhoto, PlayCircleOutline } from "@material-ui/icons";
import { Formik, Form } from "formik";

import Avatar from "components/Avatar/Avatar";
import UploadImageGrid from "./UploadImageGrid/UploadImageGrid";
import useStyles from "./useStyles";

type UploadImage = {
  url: string;
  file: File;
};

export default function PostForm(): JSX.Element {
  const classes = useStyles();

  const [attachments, setAttachments] = React.useState<{
    images: UploadImage[];
  }>({
    images: [],
  });

  function handleImageDelete(index: number) {
    setAttachments({
      ...attachments,
      images: [...attachments.images.filter((x, i) => index !== i)],
    });
  }

  function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];

    if (file && file.type.match("image.*")) {
      setAttachments({
        ...attachments,
        images: [
          ...attachments.images,
          {
            url: URL.createObjectURL(file),
            file,
          },
        ],
      });
    }

    event.target.value = "";
  }

  return (
    <Paper elevation={4}>
      <div className={classes.header}>
        <Box display="flex" px={2} py={1}>
          <Avatar />

          <Box ml={2}>
            <Typography variant="h6">User</Typography>
          </Box>
        </Box>
      </div>

      <Formik
        initialValues={{
          body: "",
        }}
        onSubmit={(values, formik) => {
          formik.setSubmitting(false);
        }}
      >
        {({ values, handleBlur, handleChange, isSubmitting }) => (
          <Form autoComplete="off">
            <div className={classes.body}>
              <Box px={3} pt={3}>
                <TextField
                  id="body"
                  name="body"
                  placeholder="What's new?"
                  variant="outlined"
                  rows={4}
                  rowsMax={5}
                  value={values.body}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  multiline
                  fullWidth
                />
              </Box>

              <Box display="flex" justifyContent="flex-start" p={2}>
                <input
                  id="uploadPhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFile}
                  hidden
                />
                <label htmlFor="uploadPhoto">
                  <IconButton component="span">
                    <AddAPhoto color="secondary" />
                  </IconButton>
                </label>

                <IconButton>
                  <PlayCircleOutline color="secondary" />
                </IconButton>
              </Box>
            </div>

            {attachments.images.length > 0 && (
              <Box px={3} pb={3}>
                <UploadImageGrid
                  images={attachments.images}
                  onImageDelete={handleImageDelete}
                />
              </Box>
            )}

            <div className={classes.footer}>
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  post
                </Button>
              </Box>
            </div>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
