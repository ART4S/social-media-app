import {
  call,
  put,
  select,
  all,
  delay,
  takeLatest,
  takeEvery,
} from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import postAPI from "api/postAPI";
import type ImageCommentDto from "model/dto/imageComment/ImageCommentDto";
import type PostCommentDto from "model/dto/postComment/PostCommentDto";
import PostDto from "model/dto/post/PostDto";
import PostImageDto from "model/dto/postImage/PostImageDto";
import PagedResponse from "model/pagination/PagedResponse";
import {
  actions,
  getPostsPagination,
  getPostCommentsPagination,
  getImageCommentsPagination,
  getPostInfo,
  getImageInfo,
  Pagination,
} from "./postListSlice";

function* fetchPosts({
  payload: userId,
}: ReturnType<typeof actions.fetchPosts>) {
  const pagination: Pagination = yield select(getPostsPagination);

  const response: PagedResponse<PostDto> = yield call(
    postAPI.getAll,
    userId,
    pagination,
  );

  yield put(actions.fetchPostsSucceed(response));
}

function* watchFetchPosts() {
  yield takeLatest(actions.fetchPosts.type, fetchPosts);
}

function* fetchPostImages({ payload: postId }: PayloadAction<string>) {
  const data: PostImageDto[] = yield call(postAPI.getImages, postId);
  yield put(actions.fetchPostImagesSucceed({ postId, data }));
}

function* watchFetchPostImages() {
  yield takeEvery(actions.fetchPostImages.type, fetchPostImages);
}

function* fetchPostComments({
  payload: postId,
}: ReturnType<typeof actions.fetchPostComments>) {
  const pagination: Pagination = yield select(
    getPostCommentsPagination,
    postId,
  );

  const response: PagedResponse<PostCommentDto> = yield call(
    postAPI.getComments,
    postId,
    pagination,
  );

  yield put(actions.fetchPostCommentsSucceed({ postId, response }));
}

function* watchFetchPostComments() {
  yield takeEvery(actions.fetchPostComments.type, fetchPostComments);
}

function* fetchMorePostComments({
  payload: postId,
}: ReturnType<typeof actions.fetchMorePostComments>) {
  yield put(actions.fetchPostComments(postId));
}

function* watchFetchMorePostComments() {
  yield takeEvery(actions.fetchMorePostComments.type, fetchMorePostComments);
}

function* fetchImageComments(
  action: ReturnType<typeof actions.fetchImageComments>,
) {
  const { postId, imageId } = action.payload;

  const pagination: Pagination = yield select(
    getImageCommentsPagination,
    postId,
    imageId,
  );

  const response: PagedResponse<ImageCommentDto> = yield call(
    postAPI.getImageComments,
    imageId,
    pagination,
  );

  yield put(actions.fetchImageCommentsSucceed({ postId, imageId, response }));
}

function* watchFetchImageComments() {
  yield takeLatest(actions.fetchImageComments.type, fetchImageComments);
}

function* fetchMoreImageComments({
  payload,
}: ReturnType<typeof actions.fetchMoreImageComments>) {
  yield put(actions.fetchImageComments(payload));
}

function* watchFetchMoreImageComments() {
  yield takeLatest(actions.fetchMoreImageComments.type, fetchMoreImageComments);
}

function* createPostComment(
  action: ReturnType<typeof actions.createPostComment>,
) {
  const { postId, comment } = action.payload;

  yield call(postAPI.createComment, postId, comment);

  const pagination: Pagination = yield select(
    getPostCommentsPagination,
    postId,
  );

  const response: PagedResponse<PostCommentDto> = yield call(
    postAPI.getComments,
    postId,
    { ...pagination, fromEnd: true, itemsPerPage: pagination.itemsPerPage + 1 },
  );

  yield put(actions.createPostCommentSucceed({ postId, response }));
}

function* watchCreatePostComment() {
  yield takeEvery(actions.createPostComment.type, createPostComment);
}

function* deletePostComment(
  action: ReturnType<typeof actions.deletePostComment>,
) {
  const { postId, commentId } = action.payload;
  yield call(postAPI.deleteComment, commentId);
  yield put(actions.fetchPostComments(postId));
}

function* watchDeletePostComment() {
  yield takeEvery(actions.deletePostComment.type, deletePostComment);
}

function* createImageComment(
  action: ReturnType<typeof actions.createImageComment>,
) {
  const { postId, imageId, comment } = action.payload;

  yield call(postAPI.createImageComment, imageId, comment);

  const pagination: Pagination = yield select(
    getImageCommentsPagination,
    postId,
    imageId,
  );

  const response: PagedResponse<ImageCommentDto> = yield call(
    postAPI.getImageComments,
    imageId,
    {
      ...pagination,
      itemsPerPage: pagination.itemsPerPage + 1,
    },
  );

  yield put(actions.createImageCommentSucceed({ postId, imageId, response }));
}

function* watchCreateImageComment() {
  yield takeEvery(actions.createImageComment.type, createImageComment);
}

function* deleteImageComment(
  action: ReturnType<typeof actions.deleteImageComment>,
) {
  const { postId, imageId, commentId } = action.payload;
  yield call(postAPI.deleteImageComment, commentId);
  yield put(actions.fetchImageComments({ postId, imageId }));
}

function* watchDeleteImageComment() {
  yield takeEvery(actions.deleteImageComment.type, deleteImageComment);
}

function* deletePost({
  payload: postId,
}: ReturnType<typeof actions.deletePost>) {
  yield call(postAPI.deletePost, postId);
  yield put(actions.deletePostSucceed(postId));
}

function* watchDeletePost() {
  yield takeEvery(actions.deletePost.type, deletePost);
}

function* togglePostLike({
  payload: postId,
}: ReturnType<typeof actions.togglePostLike>) {
  yield put(actions.togglePostLikeStarted(postId));

  yield delay(500);

  const { liked } = yield select(getPostInfo, postId);

  if (liked) {
    yield call(postAPI.addLike, postId);
  } else {
    yield call(postAPI.removeLike, postId);
  }
}

function* watchTogglePostLike() {
  yield takeLatest(actions.togglePostLike.type, togglePostLike);
}

function* toggleImageLike(action: ReturnType<typeof actions.toggleImageLike>) {
  const { postId, imageId } = action.payload;

  yield put(actions.toggleImageLikeStarted({ postId, imageId }));

  yield delay(500);

  const { liked } = yield select(getImageInfo, postId, imageId);

  if (liked) {
    yield call(postAPI.addImageLike, imageId);
  } else {
    yield call(postAPI.removeImageLike, imageId);
  }
}

function* watchToggleImageLike() {
  yield takeLatest(actions.toggleImageLike.type, toggleImageLike);
}

export default function* postListSagas() {
  yield all([
    watchFetchPosts(),
    watchFetchPostImages(),
    watchFetchPostComments(),
    watchFetchMorePostComments(),
    watchFetchImageComments(),
    watchFetchMoreImageComments(),
    watchCreatePostComment(),
    watchDeletePostComment(),
    watchCreateImageComment(),
    watchDeleteImageComment(),
    watchDeletePost(),
    watchTogglePostLike(),
    watchToggleImageLike(),
  ]);
}
