import { put, call, takeLatest, select, all } from "@redux-saga/core/effects";
import authAPI from "api/authAPI";
import LoginErrorResponse from "model/login/LoginErrorResponse";
import LoginSuccessReponse from "model/login/LoginSuccessResponse";
import { actions } from "./loginSlice";
import { actions as commonActions } from "redux/commonSlice";

function* login({ payload: vm }: ReturnType<typeof actions.login>) {
  const response: LoginSuccessReponse | LoginErrorResponse = yield call(
    authAPI.login,
    vm,
  );

  if (isSuccess(response)) {
    yield put(commonActions.fetchUser(response.userId));
  } else {
    yield put(actions.loginFailed(response.errors));
  }
}

function isSuccess(response: any): response is LoginSuccessReponse {
  return "userId" in response;
}

function* watchLogin() {
  yield takeLatest(actions.login.type, login);
}

function* logout() {
  yield call(authAPI.logout);
  yield put(commonActions.setUser(null));
}

function* watchLogout() {
  yield takeLatest(actions.logout.type, logout);
}

export default function* loginSagas() {
  yield all([watchLogin(), watchLogout()]);
}
