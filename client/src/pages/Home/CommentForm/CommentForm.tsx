import React from "react";
import { Avatar, Box, TextField, Button, Collapse } from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";
import { Formik } from "formik";

import useStyles from "./useStyles";

export default function CommentForm(): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      onSubmit={(values, formik) => {
        formik.setSubmitting(false);
      }}
    >
      {(formik) => (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Box display="flex" justifyContent="center">
            <Avatar>
              <PhotoCameraOutlined />
            </Avatar>

            <Box ml={2} width="100%">
              <TextField
                id="comment"
                placeholder="Comment..."
                value={formik.values.comment}
                onChange={(e) =>
                  formik.setFieldValue("comment", e.currentTarget.value)
                }
                fullWidth
              />
            </Box>
          </Box>

          <Box mt={1}>
            <Collapse
              className={classes.collapse}
              in={Boolean(formik.values.comment.trim())}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
              >
                Add
              </Button>
            </Collapse>
          </Box>
        </form>
      )}
    </Formik>
  );
}
