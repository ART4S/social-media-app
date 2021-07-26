import { put, call, takeLatest, all, select, delay } from "redux-saga/effects";

import userAPI from "api/userAPI";
import userProfileAPI from "api/userProfileAPI";
import UserProfileDto from "model/dto/userProfile/UserProfileDto";
import { actions as commonActions } from "redux/commonSlice";

import { actions, getProfile } from "./profileSlice";
import followersSectionSagas from "./ProfileSections/FollowersSection/followersSectionSagas";
import followingsSectionSagas from "./ProfileSections/FollowingsSection/followingsSectionSagas";

function* fetchProfile({ payload: userId }: ReturnType<typeof actions.fetchProfile>) {
  const profile: UserProfileDto = yield call(userAPI.getProfile, userId);
  yield put(actions.fetchProfileSucceed(profile));
}

function* watchFetchProfile() {
  yield takeLatest(actions.fetchProfile.type, fetchProfile);
}

function* setStatus({ payload: text }: ReturnType<typeof actions.setStatus>) {
  const { id } = getProfile(yield select());
  yield call(userProfileAPI.updateStatus, id, text);
}

function* watchSetStatus() {
  yield takeLatest(actions.setStatus.type, setStatus);
}

function* deleteProfile() {
  const { id } = getProfile(yield select());
  yield call(userProfileAPI.deleteProfile, id);
  yield put(commonActions.setUser(null));
}

function* watchDeleteProfile() {
  yield takeLatest(actions.deleteProfile.type, deleteProfile);
}

function* toggleProfileFollow() {
  yield delay(500);

  const { userId, isCurrentUserFollow } = getProfile(yield select());

  if (isCurrentUserFollow) {
    yield call(userAPI.createFollowing, { userId });
  } else {
    yield call(userAPI.deleteFollowing, userId);
  }
}

function* watchToggleFollowProfile() {
  yield takeLatest(actions.toggleFollowProfile.type, toggleProfileFollow);
}

export default function* profileSagas() {
  yield all([
    watchFetchProfile(),
    watchSetStatus(),
    watchDeleteProfile(),
    watchToggleFollowProfile(),
    followingsSectionSagas(),
    followersSectionSagas(),
  ]);
}
