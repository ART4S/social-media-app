import React from "react";
import { Box, TextField, Button, Collapse } from "@material-ui/core";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";

import Avatar from "components/Avatar/Avatar";
import useStyles from "./useStyles";

import {
  getPostCommentSubmitAreaVisibility,
  showPostCommentSubmitArea,
} from "../postListSlice";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

interface PostCommentFormProps {
  postId: string;
}

interface FormValues {
  comment: "";
}

export default function PostCommentForm({
  postId,
}: PostCommentFormProps): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isSubmitAreaVisible = useAppSelector((state) =>
    getPostCommentSubmitAreaVisibility(state, postId),
  );

  function handleCommentFocus() {
    dispatch(showPostCommentSubmitArea({ postId, visibility: true }));
  }

  function handleCancelClick(formik: FormikProps<FormValues>) {
    formik.setFieldValue("comment", "");
    dispatch(showPostCommentSubmitArea({ postId, visibility: false }));
  }

  const initialValues: FormValues = {
    comment: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormValues, formik: FormikHelpers<FormValues>) => {
        formik.setSubmitting(false);
      }}
    >
      {(formik: FormikProps<FormValues>) => (
        <Form className={classes.form} autoComplete="off">
          <Box display="flex" justifyContent="center">
            <Avatar />

            <Box ml={2} width="100%">
              <TextField
                id="comment"
                placeholder="Leave a comment..."
                value={formik.values.comment}
                onFocus={handleCommentFocus}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
              />
            </Box>
          </Box>

          <Collapse in={isSubmitAreaVisible}>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Box display="flex">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCancelClick(formik)}
                >
                  cancel
                </Button>

                <Box ml={2}>
                  <Button type="submit" variant="contained" color="primary">
                    add
                  </Button>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Form>
      )}
    </Formik>
  );
}
