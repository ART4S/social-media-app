import { put, call, takeLatest, all } from "@redux-saga/core/effects";
import userAPI from "api/userAPI";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import { actions } from "./profileCommonSlice";

function* fetchProfile({
  payload: userId,
}: ReturnType<typeof actions.fetchProfile>) {
  yield put(actions.fetchProfileStarted());

  const profile: UserProfileDto = yield call(userAPI.getProfile, userId);

  yield put(actions.fetchProfileSucceed(profile));
}

function* watchFetchProfile() {
  yield takeLatest(actions.fetchProfile.type, fetchProfile);
}

export default function* profileCommonSagas() {
  yield all([watchFetchProfile()]);
}
