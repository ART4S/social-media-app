import {
  Paper,
  Avatar,
  Box,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { PhotoCameraOutlined, AddAPhoto, QueueMusic } from "@material-ui/icons";
import { Formik } from "formik";
import useStyles from "./useStyles";

export default function PostForm(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper elevation={4}>
      <div className={classes.header}>
        <Avatar>
          <PhotoCameraOutlined />
        </Avatar>

        <Box ml={2}>
          <Typography variant="h6">User</Typography>
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
              <Box paddingX={3} paddingTop={3}>
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

              <div className={classes.actions}>
                <IconButton>
                  <AddAPhoto color="secondary" />
                </IconButton>

                <IconButton>
                  <QueueMusic color="secondary" />
                </IconButton>
              </div>
            </div>

            <div className={classes.footer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Post
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  );
}
