import React from "react";
import { Paper, Box, TextField, Button, IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AddAPhoto, PlayCircleOutline } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";

import Avatar from "components/Avatar/Avatar";
import UploadImage from "./UploadImage/UploadImage";
import useStyles from "./useStyles";
import ImageGrid from "components/ImageGrid/ImageGrid";
import UserDto from "model/dto/UserDto";
import useAppSelector from "hooks/useAppSelector";
import { getUser } from "pages/Login/loginSlice";
import { getUserName } from "utils/userUtils";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getIsSubmitting } from "./postFormSlice";
import PostCreateDto from "model/dto/posts/PostCreateDto";

const initialValues: PostCreateDto = {
  body: "",
  images: [],
};

const validationSchema = yup.object({
  body: yup.string().trim().required(),
});

export default function PostForm(): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const user: UserDto = useAppSelector(getUser);

  const isSubmitting = useAppSelector(getIsSubmitting);

  const { values, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit(post: PostCreateDto) {
      dispatch(actions.createPost(post));
    },
  });

  React.useEffect(() => {
    formik.setSubmitting(isSubmitting);
    if (!isSubmitting) {
      formik.resetForm();
    }
  }, [isSubmitting]);

  const uploadDisabled = isSubmitting || values.images.length > 9;

  function handleAddImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];

    if (file && file.type.match("image.*")) {
      formik.setFieldValue("images", [
        ...values.images,
        URL.createObjectURL(file),
      ]);
    }

    event.target.value = "";
  }

  function handleDeleteImage(index: number) {
    const images = [...values.images];
    images.splice(index, 1);
    formik.setFieldValue("images", images);
  }

  return (
    <Paper elevation={4}>
      <div className={classes.header}>
        <Box display="flex" px={2} py={1}>
          <Avatar src={user.avatarUrl} />

          <Box display="flex" alignItems="center" ml={2}>
            <Typography align="center">{getUserName(user)}</Typography>
          </Box>
        </Box>
      </div>

      <form autoComplete="off" onSubmit={formik.handleSubmit}>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isSubmitting}
              multiline
              fullWidth
            />
          </Box>

          <Box display="flex" justifyContent="flex-start" p={2}>
            <input
              id="addImage"
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              hidden
              disabled={uploadDisabled}
            />
            <label htmlFor="addImage">
              <IconButton
                component="span"
                color="secondary"
                disabled={uploadDisabled}
              >
                <AddAPhoto color="inherit" />
              </IconButton>
            </label>

            <IconButton color="secondary" disabled={isSubmitting}>
              <PlayCircleOutline color="inherit" />
            </IconButton>
          </Box>
        </div>

        {!!values.images.length && (
          <Box px={3} pb={3}>
            <ImageGrid
              imagesCount={values.images.length}
              renderImage={(index: number) => (
                <UploadImage
                  url={values.images[index]}
                  deleteDisabled={isSubmitting}
                  onDelete={() => handleDeleteImage(index)}
                />
              )}
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
      </form>
    </Paper>
  );
}
