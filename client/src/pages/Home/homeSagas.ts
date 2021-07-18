import { all } from "@redux-saga/core/effects";

import postFormSagas from "./PostForm/postFormSagas";
import userListSagas from "./UserList/userListSagas";

export default function* rootSaga() {
  yield all([postFormSagas(), userListSagas()]);
}
