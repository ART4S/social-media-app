import React from "react";
import { Typography, Link } from "@material-ui/core";
import {
  Paper,
  IconButton,
  Avatar,
  Box,
  TextField,
  Button,
  Collapse,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { PhotoCameraOutlined, Favorite, Chat } from "@material-ui/icons";
import { Formik } from "formik";

import IPost from "model/Post";
import moment from "moment";
import commentAPI from "api/commentAPI";
import useStyles from "./useStyles";
import Comment from "../Comment/Comment";
import IComment from "model/Comment";

type PostProps = { data: IPost };

export default function Post({ data }: PostProps): JSX.Element {
  const classes = useStyles();
  const [comments, setComments] = React.useState<IComment[]>([]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      const loadedComments: IComment[] = await commentAPI.getAll(data.id);
      if (active) {
        setComments(loadedComments);
      }
    })();

    return () => {
      active = false;
    };
  });

  return (
    <Paper elevation={3}>
      <div className={classes.header}>
        <Box display="flex">
          <Avatar className={classes.avatar} src={data.authorAvatarUrl}>
            <PhotoCameraOutlined />
          </Avatar>

          <Box display="flex" flexDirection="column" ml={2}>
            <Link>
              <Typography>{data.authorName}</Typography>
            </Link>

            <Typography variant="subtitle2">
              {moment(data.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>

        <IconButton>
          <DeleteIcon color="secondary" />
        </IconButton>
      </div>

      <Typography className={classes.body} variant="body1">
        {data.body}
      </Typography>

      <Box display="flex">
        <Favorite />

        <Box ml={2}>
          <Chat />
        </Box>
      </Box>

      <div className={classes.footer}>
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={(values, formik) => {
            formik.setSubmitting(false);
          }}
        >
          {(formik) => (
            <form
              className={classes.commentForm}
              onSubmit={formik.handleSubmit}
            >
              <Box display="flex" justifyContent="center">
                <Avatar>
                  <PhotoCameraOutlined />
                </Avatar>

                <Box ml={2} width="100%">
                  <TextField
                    id="comment"
                    label="Comment..."
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
                  in={Boolean(formik.values.comment.trim())}
                  style={{ display: "flex", justifyContent: "flex-end" }}
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

        {comments.map((x) => (
          <Comment data={x} />
        ))}
      </div>
    </Paper>
  );
}
