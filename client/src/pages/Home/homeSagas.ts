import { all } from "@redux-saga/core/effects";

import postFormSagas from "./PostForm/postFormSagas";
import postListSagas from "./PostList/postListSagas";
import userListSagas from "./UserList/userListSagas";

export default function* rootSaga() {
  yield all([postListSagas(), postFormSagas(), userListSagas()]);
}
