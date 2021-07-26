import { put, call, takeLatest, select, all } from "redux-saga/effects";

import userProfileAPI from "api/userProfileAPI";
import type UserProfileInfoDto from "model/dto/userProfile/UserProfileInfoDto";
import { actions as commonActions } from "redux/commonSlice";

import { actions, getProfile } from "./profileEditorSlice";

function* fetchProfile({ payload: id }: ReturnType<typeof actions.fetchProfile>) {
  const profile: UserProfileInfoDto = yield call(userProfileAPI.getById, id);
  yield put(actions.fetchProfileSucceed(profile));
}

function* watchProfile() {
  yield takeLatest(actions.fetchProfile.type, fetchProfile);
}

function* saveProfile({ payload: profile }: ReturnType<typeof actions.saveProfile>) {
  const { id, userId } = yield select(getProfile);

  yield call(userProfileAPI.updateProfile, id, profile);

  yield put(commonActions.fetchUser(userId));

  yield put(actions.saveProfileSucceed());
}

function* watchSaveProfile() {
  yield takeLatest(actions.saveProfile.type, saveProfile);
}

export default function* profileEditorSagas() {
  yield all([watchProfile(), watchSaveProfile()]);
}
