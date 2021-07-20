import { put, call, takeLatest, select, all } from "@redux-saga/core/effects";
import userAPI from "api/userAPI";
import UserDto from "model/dto/user/UserDto";
import { actions } from "./commonSlice";

function* fetchUser({ payload: userId }: ReturnType<typeof actions.fetchUser>) {
  const user: UserDto = yield call(userAPI.getById, userId);
  yield put(actions.setUser(user));
}

function* watchFetchUser() {
  yield takeLatest(actions.fetchUser.type, fetchUser);
}

export default function* commonSagas() {
  yield all([watchFetchUser()]);
}
