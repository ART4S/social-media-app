import { put, call, takeLatest, all } from "@redux-saga/core/effects";
import followingsSectionSagas from "./ProfileSections/FollowingsSection/followingsSectionSagas";
import followersSectionSagas from "./ProfileSections/FollowersSection/followersSectionSagas";
import userAPI from "api/userAPI";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import { actions } from "./profileSlice";

function* fetchProfile({
  payload: userId,
}: ReturnType<typeof actions.fetchProfile>) {
  const profile: UserProfileDto = yield call(userAPI.getProfile, userId);
  yield put(actions.fetchProfileSucceed(profile));
}

function* watchFetchProfile() {
  yield takeLatest(actions.fetchProfile.type, fetchProfile);
}

function* setStatus({ payload: text }: ReturnType<typeof actions.setStatus>) {
  yield call(userAPI.updateStatus, text);
}

function* watchSetStatus() {
  yield takeLatest(actions.setStatus.type, setStatus);
}

export default function* profileSagas() {
  yield all([
    watchFetchProfile(),
    watchSetStatus(),
    followingsSectionSagas(),
    followersSectionSagas(),
  ]);
}
