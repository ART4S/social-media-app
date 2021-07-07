import { all } from "@redux-saga/core/effects";

import postListSagas from "./PostList/postListSagas";

export default function* rootSaga() {
  yield all([postListSagas()]);
}
