import { put, call, takeEvery, all } from "@redux-saga/core/effects";
import postAPI from "api/postAPI";
import PostDto from "model/dto/PostDto";
import { actions } from "./postFormSlice";
import { actions as postListActions } from "../../../components/PostList/postListSlice";

function* createPost({ payload: post }: ReturnType<typeof actions.createPost>) {
  const id: string = yield call(postAPI.createPost, post);

  const newPost: PostDto = yield call(postAPI.getById, id);

  yield put(postListActions.addPost(newPost));

  yield put(actions.createPostSucceed());
}

function* watchCreatePost() {
  yield takeEvery(actions.createPost.type, createPost);
}

export default function* postFormSagas() {
  yield all([watchCreatePost()]);
}
