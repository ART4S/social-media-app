import { Paper, Box, TextField, Button, IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AddAPhoto, QueueMusic } from "@material-ui/icons";
import { Formik } from "formik";

import Avatar from "common/components/Avatar/Avatar";
import useStyles from "./useStyles";

export default function PostForm(): JSX.Element {
  const classes = useStyles();

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
        {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
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
                <IconButton>
                  <AddAPhoto color="secondary" />
                </IconButton>

                <IconButton>
                  <QueueMusic color="secondary" />
                </IconButton>
              </Box>
            </div>

            <div className={classes.footer}>
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Post
                </Button>
              </Box>
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  );
}
