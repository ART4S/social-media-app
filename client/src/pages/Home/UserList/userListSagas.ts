import { put, call, select, delay, takeLatest, all } from "redux-saga/effects";

import userAPI from "api/userAPI";
import type UserDto from "model/dto/user/UserDto";

import { actions, getSearchText } from "./userListSlice";

function* changeSearchText({ payload: searchText }: ReturnType<typeof actions.changeSearchText>) {
  yield put(actions.setSearchText(searchText));

  yield delay(500);

  yield put(actions.searchUsers());
}

function* watchChangeSearchText() {
  yield takeLatest(actions.changeSearchText.type, changeSearchText);
}

function* searchUsers(action: ReturnType<typeof actions.searchUsers>) {
  yield put(actions.searchStarted());

  const searchText: string = yield select(getSearchText);

  const users: UserDto[] = yield call(userAPI.search, searchText);

  yield put(actions.searchSucceed(users));
}

function* watchSearchUsers() {
  yield takeLatest(actions.searchUsers.type, searchUsers);
}

export default function* userListSagas() {
  yield all([watchChangeSearchText(), watchSearchUsers()]);
}
