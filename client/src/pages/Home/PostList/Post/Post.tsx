import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Paper, IconButton, Box } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import Comment from "pages/Home/PostList/PostComment/PostComment";
import CommentForm from "pages/Home/PostList/PostCommentForm/PostCommentForm";
import ImageGrid from "components/ImageGrid/ImageGrid";
import ImageViewer from "pages/Home/PostList/ImageViewer/ImageViewer";
import LikeButton from "components/Buttons/LikeButton/LikeButton";
import ShareButton from "components/Buttons/ShareButton/ShareButton";

import PostInfo from "../PostInfo/PostInfo";
import useStyles from "./useStyles";

import type PostImageDto from "model/dto/PostImageDto";

import useAppSelector from "hooks/useAppSelector";
import {
  fetchPostComments,
  fetchMorePostComments,
  fetchPostImages,
  notfyPostLiked,
  setSelectedImageId,
  getPostInfo,
  getPostImagesInfo,
  getPostCommentIds,
  getPostCommentsPagination,
  getSelectedImageId,
  togglePostLike,
} from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";
import PostCommentDto from "model/dto/PostCommentDto";
import PostDto from "model/dto/PostDto";
import { debounce, DebouncedFunc } from "lodash";

interface PostProps {
  postId: string;
}

export default function Post({ postId }: PostProps): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const post: PostDto = useAppSelector((state) => getPostInfo(state, postId));
  const commentIds: string[] = useAppSelector((state) =>
    getPostCommentIds(state, postId),
  );
  const images: PostImageDto[] = useAppSelector((state) =>
    getPostImagesInfo(state, postId),
  );
  const selectedImageId: string | null = useAppSelector((state) =>
    getSelectedImageId(state, postId),
  );
  const { currentPage, totalPages } = useAppSelector((state) =>
    getPostCommentsPagination(state, postId),
  );

  React.useEffect(() => {
    dispatch(fetchPostImages(postId));
    dispatch(fetchPostComments(postId));
  }, []);

  // TODO: глянуть можно ли сделать напрямую через thunk
  const debouncedNotfyPostLiked: DebouncedFunc<(postId: string) => void> =
    React.useCallback(
      debounce((postId: string) => dispatch(notfyPostLiked(postId)), 500),
      [],
    );

  function handleLikeClick() {
    dispatch(togglePostLike(postId));
    debouncedNotfyPostLiked(postId);
  }

  return (
    <Paper elevation={3}>
      <div className={classes.header}>
        <Box display="flex" justifyContent="space-between" px={3} py={1}>
          <PostInfo post={post} />

          <IconButton>
            <Delete color="secondary" />
          </IconButton>
        </Box>
      </div>

      <Box p={2}>
        <Typography variant="body1">{post.body}</Typography>
      </Box>

      {images.length > 0 && (
        <Box px={2}>
          <ImageGrid
            images={images}
            onImageClick={({ id }: PostImageDto) =>
              dispatch(setSelectedImageId({ postId, imageId: id }))
            }
          />
        </Box>
      )}

      {selectedImageId !== null && (
        <ImageViewer
          postId={postId}
          onClose={() =>
            dispatch(setSelectedImageId({ postId, imageId: null }))
          }
        />
      )}

      <Box display="flex" p={2}>
        <LikeButton active={post.liked} onClick={handleLikeClick} />

        <ShareButton />
      </Box>

      <div className={classes.footer}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          py={2}
          px={3}
        >
          <Box my={2}>
            <CommentForm postId={postId} />
          </Box>

          {commentIds.map((id) => (
            <Box key={id} mt={2}>
              <Comment postId={postId} commentId={id} />
            </Box>
          ))}

          {currentPage < totalPages && (
            <Box mt={2}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(fetchMorePostComments(postId))}
              >
                Show more comments
              </Link>
            </Box>
          )}
        </Box>
      </div>
    </Paper>
  );
}
