import React from "react";
import { Paper, Box, TextField, Button, IconButton } from "@material-ui/core";
import { AddAPhoto, PlayCircleOutline } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";

import ImageGrid from "components/ImageGrid/ImageGrid";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import type PostCreateDto from "model/dto/post/PostCreateDto";

import { actions, getIsSubmitting } from "./postFormSlice";
import UploadImage from "./UploadImage/UploadImage";
import UserInfo from "./UserInfo/UserInfo";

const initialValues: PostCreateDto = {
  body: "",
  images: [],
};

const validationSchema = yup.object({
  body: yup.string().trim().required(),
});

export default function PostForm(): JSX.Element {
  const dispatch = useAppDispatch();

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
      formik.setFieldValue("images", [...values.images, URL.createObjectURL(file)]);
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
      <Box px={2} py={1} bgcolor="grey.300">
        <UserInfo />
      </Box>

      <form autoComplete="off" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Box px={3} pt={3} bgcolor="background.paper">
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
            <IconButton component="span" color="secondary" disabled={uploadDisabled}>
              <AddAPhoto color="inherit" />
            </IconButton>
          </label>

          <IconButton color="secondary" disabled={isSubmitting}>
            <PlayCircleOutline color="inherit" />
          </IconButton>
        </Box>

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

        <Box display="flex" justifyContent="flex-end" p={2} bgcolor="grey.300">
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            post
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
