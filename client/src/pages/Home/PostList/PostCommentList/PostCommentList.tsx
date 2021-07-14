import React from "react";
import { Link } from "@material-ui/core";
import { Box } from "@material-ui/core";

import PostComment from "pages/Home/PostList/PostComment/PostComment";

import {
  actions,
  getPostCommentIds,
  getPostCommentsPagination,
} from "../postListSlice";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import PostCommentCreateDto from "model/dto/posts/PostCommentCreateDto";
import PostCommentForm from "../PostCommentForm/PostCommentForm";

interface PostCommentListType {
  postId: string;
}

export function PostCommentList({ postId }: PostCommentListType) {
  const dispatch = useAppDispatch();

  const commentIds: string[] = useAppSelector((state) =>
    getPostCommentIds(state, postId),
  );

  const { fromEnd, currentPage, totalPages } = useAppSelector((state) =>
    getPostCommentsPagination(state, postId),
  );

  React.useEffect(() => {
    dispatch(actions.fetchPostComments(postId));
  }, [postId]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="start">
      <Box my={2}>
        <PostCommentForm postId={postId} />
      </Box>

      {fromEnd && currentPage < totalPages && (
        <Box mt={2}>
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(actions.fetchMorePostComments(postId))}
          >
            Show previous comments
          </Link>
        </Box>
      )}

      {(fromEnd ? commentIds.reverse() : commentIds).map((id) => (
        <Box key={id} mt={2}>
          <PostComment postId={postId} commentId={id} />
        </Box>
      ))}

      {!fromEnd && currentPage < totalPages && (
        <Box mt={2}>
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(actions.fetchMorePostComments(postId))}
          >
            Show more comments
          </Link>
        </Box>
      )}
    </Box>
  );
}
