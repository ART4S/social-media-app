import React from "react";
import { Box, TextField, Button, Collapse } from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";

import Avatar from "components/Avatar/Avatar";
import useStyles from "./useStyles";
import PostCommentCreateDto from "model/dto/posts/PostCommentCreateDto";
import { actions } from "../postListSlice";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { getUser } from "pages/commonSlice";

const initialValues: PostCommentCreateDto = {
  text: "",
};

const validationSchema = yup.object({
  text: yup.string().trim().required(),
});

interface PostCommentFormProps {
  postId: string;
}

export default function PostCommentForm({
  postId,
}: PostCommentFormProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const avatarUrl = useAppSelector((state) => getUser(state).avatarUrl);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [isButtonsVisible, setIsButtonsVisible] = React.useState(false);

  function handleSubmit(
    comment: PostCommentCreateDto,
    formik: FormikHelpers<PostCommentCreateDto>,
  ) {
    inputRef.current?.blur();
    dispatch(actions.createPostComment({ postId, comment }));
    setIsButtonsVisible(false);
    formik.resetForm();
    formik.setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, handleBlur, handleChange, resetForm }) => (
        <Form className={classes.form} autoComplete="off">
          <Box display="flex" justifyContent="center">
            <Avatar src={avatarUrl} />

            <Box ml={2} width="100%">
              <TextField
                inputRef={inputRef}
                id="text"
                placeholder="Leave a comment..."
                value={values.text}
                onFocus={() => setIsButtonsVisible(true)}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Box>

          <Collapse in={isButtonsVisible}>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Box display="flex">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    resetForm();
                    setIsButtonsVisible(false);
                  }}
                >
                  cancel
                </Button>

                <Box ml={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
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
