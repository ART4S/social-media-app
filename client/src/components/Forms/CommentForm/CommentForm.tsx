import React from "react";
import { Box, TextField, Button, Collapse } from "@material-ui/core";
import { Formik, Form } from "formik";

import Avatar from "components/Avatar/Avatar";
import useStyles from "./useStyles";

export default function CommentForm(): JSX.Element {
  const classes = useStyles();

  const [showSubmitArea, setShowSubmitArea] = React.useState(false);

  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      onSubmit={(values, formik) => {
        formik.setSubmitting(false);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={classes.form} autoComplete="off">
          <Box display="flex" justifyContent="center">
            <Avatar />

            <Box ml={2} width="100%">
              <TextField
                id="comment"
                placeholder="Leave a comment..."
                value={values.comment}
                onFocus={() => setShowSubmitArea(true)}
                onBlur={() =>
                  !values.comment.trim() && setShowSubmitArea(false)
                }
                onChange={(e) =>
                  setFieldValue("comment", e.currentTarget.value)
                }
                fullWidth
              />
            </Box>
          </Box>

          <Collapse in={showSubmitArea}>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button type="submit" variant="contained" color="primary">
                add
              </Button>
            </Box>
          </Collapse>
        </Form>
      )}
    </Formik>
  );
}
