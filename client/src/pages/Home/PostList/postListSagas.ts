import {
  call,
  put,
  select,
  all,
  takeLatest,
  takeEvery,
} from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import postAPI from "api/postAPI";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import PostCommentDto from "model/dto/PostCommentDto";
import PostDto from "model/dto/PostDto";
import PostImageDto from "model/dto/PostImageDto";
import PagedResponse from "model/pagination/PagedResponse";
import { AppState } from "redux/store";
import { getUser } from "../../commonSlice";
import PostCommentCreateDto from "model/dto/posts/PostCommentCreateDto";
import {
  getSelf,
  getPostCommentsPagination,
  getImageCommentsPagination,
  getPostInfo,
  getPostImageById,
  createPostComment,
  deletePostComment,
  deleteImageComment,
  notifyPostLiked,
  notifyPostImageLiked,
  fetchUserPosts,
  fetchPostImages,
  fetchUserPostsSucceed,
  fetchPostImagesSucceed,
  fetchPostComments,
  fetchPostCommentsSucceed,
  fetchMorePostComments,
  fetchMorePostCommentsStarted,
  fetchImageComments,
  fetchImageCommentsSucceed,
  fetchMoreImageComments,
  fetchMoreImageCommentsStarted,
} from "./postListSlice";

// TODO: заменить тип на ReturnType

function* fetchUserPostsSaga() {
  yield takeLatest(fetchUserPosts.type, function* () {
    {
      const state: AppState = yield select();
      const userId = getUser(state)!.id;
      const { pagination } = getSelf(state).posts;

      const data: PagedResponse<PostDto> = yield call(
        postAPI.getAll,
        userId,
        pagination,
      );

      yield put(fetchUserPostsSucceed(data));
    }
  });
}

function* fetchPostImagesSaga() {
  yield takeEvery(
    fetchPostImages.type,
    function* ({ payload: postId }: PayloadAction<string>) {
      const data: PostImageDto[] = yield call(postAPI.getImages, postId);
      yield put(fetchPostImagesSucceed({ postId, data }));
    },
  );
}

// export const fetchPostComments = createAsyncThunk<
//   PagedResponse<PostCommentDto>,
//   string,
//   { state: AppState }
// >(`${sliceName}/fetchPostComments`, (postId, thunkApi) => {
//   const { pagination } = getPostById(thunkApi.getState(), postId)!.comments;
//   return postAPI.getComments(postId, pagination);
// });

function* fetchPostCommentsSaga() {
  yield takeEvery(
    fetchPostComments.type,
    function* ({ payload: postId }: PayloadAction<string>) {
      const state: AppState = yield select();
      const pagination = getPostCommentsPagination(state, postId);
      const response: PagedResponse<PostCommentDto> = yield call(
        postAPI.getComments,
        postId,
        pagination,
      );
      yield put(fetchPostCommentsSucceed({ postId, response }));
    },
  );
}

// export const fetchMorePostComments = createAsyncThunk<
//   PagedResponse<PostCommentDto>,
//   string,
//   { state: AppState; dispatch: AppDispatch }
// >(`${sliceName}/fetchMorePostComments`, (postId, thunkApi) =>
//   thunkApi.dispatch(fetchPostComments(postId)).then(unwrapResult),
// );

function* fetchMorePostCommentsSaga() {
  yield takeEvery(
    fetchMorePostComments.type,
    function* ({ payload: postId }: PayloadAction<string>) {
      put(fetchMorePostCommentsStarted(postId));
      put(fetchPostComments(postId)); // TODO: найти другой способ вызова
    },
  );
}

// export const fetchSelectedImageComments = createAsyncThunk<
//   PagedResponse<ImageCommentDto>,
//   string,
//   { state: AppState }
// >(`${sliceName}/fetchSelectedImageComments`, (postId, thunkApi) => {
//   const {
//     comments: { pagination },
//     info: { id },
//   } = getSelectedImage(thunkApi.getState(), postId)!;
//   return postAPI.getImageComments(id, pagination);
// });

function* fetchImageCommentsSaga() {
  yield takeLatest(
    fetchImageComments.type,
    function* (action: PayloadAction<{ postId: string; imageId: string }>) {
      const { postId, imageId } = action.payload;
      const state: AppState = yield select();
      const pagination = getImageCommentsPagination(state, postId, imageId);
      const response: PagedResponse<ImageCommentDto> = yield call(
        postAPI.getImageComments,
        imageId,
        pagination,
      );
      yield put(fetchImageCommentsSucceed({ postId, imageId, response }));
    },
  );
}

// export const fetchMoreSelectedImageComments = createAsyncThunk<
//   PagedResponse<ImageCommentDto>,
//   string,
//   { state: AppState; dispatch: AppDispatch }
// >(`${sliceName}/fetchMoreSelectedImageComments`, (postId, thunkApi) =>
//   thunkApi.dispatch(fetchSelectedImageComments(postId)).then(unwrapResult),
// );

function* fetchMoreImageCommentsSaga() {
  yield takeLatest(
    fetchMoreImageComments.type,
    function* ({
      payload,
    }: PayloadAction<{ postId: string; imageId: string }>) {
      yield put(fetchMoreImageCommentsStarted(payload));
      yield put(fetchImageComments(payload));
    },
  );
}

function* createPostCommentSaga() {
  yield takeEvery(
    createPostComment.type,
    function* (
      action: PayloadAction<{ postId: string; comment: PostCommentCreateDto }>,
    ) {
      const { postId, comment } = action.payload;
      yield call(postAPI.createComment, postId, comment);
      yield put(fetchPostComments(postId));
    },
  );
}

// export const deletePostComment = createAsyncThunk<
//   void,
//   { postId: string; commentId: string },
//   { state: AppState; dispatch: AppDispatch }
// >(`${sliceName}/deletePostComment`, async ({ postId, commentId }, thunkApi) => {
//   await postAPI.deleteComment(commentId);
//   await thunkApi.dispatch(fetchPostComments(postId));
// });

function* deletePostCommentSaga() {
  yield takeEvery(
    deletePostComment.type,
    function* (action: PayloadAction<{ postId: string; commentId: string }>) {
      const { postId, commentId } = action.payload;
      yield call(postAPI.deleteComment, commentId);
      yield put(fetchPostComments(postId));
    },
  );
}

// export const notfyPostLiked = createAsyncThunk<
//   void,
//   string,
//   { state: AppState }
// >(`${sliceName}/notfyPostLiked`, async (postId, thunkApi) => {
//   const state = thunkApi.getState();
//   const userId = getUser(state)!.id;
//   const post = getPostInfo(state, postId);

//   if (post.liked) await postAPI.addLike(postId, userId);
//   else await postAPI.removeLike(postId, userId);
// });

function* notifyPostLikedSaga() {
  yield takeLatest(
    notifyPostLiked.type,
    function* ({ payload: postId }: ReturnType<typeof notifyPostLiked>) {
      const state: AppState = yield select();
      const post = getPostInfo(state, postId);
      const { id: userId } = getUser(state)!;

      if (post.liked) yield call(postAPI.addLike, postId, userId);
      else yield call(postAPI.removeLike, postId, userId);
    },
  );
}

// export const notifyPostImageLiked = createAsyncThunk<
//   void,
//   { postId: string; imageId: string },
//   { state: AppState }
// >(
//   `${sliceName}/notifyPostImageLiked`,
//   async ({ postId, imageId }, thunkApi) => {
//     const state = thunkApi.getState();
//     const image = getPostImageById(state, postId, imageId).info;
//     const userId = getUser(state)!.id;

//     if (image.liked) await postAPI.addImageLike(imageId, userId);
//     else await postAPI.removeImageLike(imageId, userId);
//   },
// );

function* notifyPostImageLikedSaga() {
  yield takeEvery(
    notifyPostImageLiked.type,
    function* (action: ReturnType<typeof notifyPostImageLiked>) {
      const { postId, imageId } = action.payload;
      const state: AppState = yield select();
      const image = getPostImageById(state, postId, imageId).info;
      const { id: userId } = getUser(state)!;

      if (image.liked) yield call(postAPI.addImageLike, imageId, userId);
      else yield call(postAPI.removeImageLike, imageId, userId);
    },
  );
}

// export const deleteImageComment = createAsyncThunk<
//   void,
//   { postId: string; commentId: string },
//   { state: AppState; dispatch: AppDispatch }
// >(
//   `${sliceName}/deleteImageComment`,
//   async ({ postId, commentId }, thunkApi) => {
//     await postService.deleteImageComment(commentId);
//     await thunkApi.dispatch(fetchSelectedImageComments(postId));
//   },
// );

function* deleteImageCommentSaga() {
  yield takeEvery(
    deleteImageComment.type,
    function* (action: ReturnType<typeof deleteImageComment>) {
      const { postId, imageId, commentId } = action.payload;
      yield call(postAPI.deleteImageComment, commentId);
      yield put(fetchImageComments({ postId, imageId }));
    },
  );
}

export default function* rootSaga() {
  yield all([
    fetchUserPostsSaga(),
    fetchPostImagesSaga(),
    fetchPostCommentsSaga(),
    fetchMorePostCommentsSaga(),
    fetchImageCommentsSaga(),
    fetchMoreImageCommentsSaga(),
    createPostCommentSaga(),
    deletePostCommentSaga(),
    notifyPostLikedSaga(),
    notifyPostImageLikedSaga(),
    deleteImageCommentSaga(),
  ]);
}

// comments: imageCommentAdapter.getInitialState({
//   pagination: {
//     currentPage: 1,
//     totalPages: 0,
//     pageSize: 0,
//     totalItems: 0,
//     itemsPerPage: 3,
//   },
// })

// .addCase(fetchSelectedImageComments.fulfilled, (state, action) => {
//   const postId = action.meta.arg;
//   const post = state.posts.entities[postId];
//   const imageComments = post?.selectedImage?.comments;
//   if (imageComments) {
//     const { data, currentPage, totalPages, pageSize, totalItems } =
//       action.payload;

//     imageCommentAdapter.setAll(imageComments, data);

//     imageComments.pagination = {
//       ...imageComments.pagination,
//       currentPage,
//       totalPages,
//       pageSize,
//       totalItems,
//     };
//   }
// })

// .addCase(fetchMoreSelectedImageComments.pending, (state, action) => {
//   const postId = action.meta.arg;
//   const pagination =
//     state.posts.entities[postId]?.selectedImage?.comments.pagination;
//   if (pagination) {
//     pagination.itemsPerPage += 3;
//   }
// })
