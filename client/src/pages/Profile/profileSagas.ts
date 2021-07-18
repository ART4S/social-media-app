import { put, call, takeLatest, all, select } from "@redux-saga/core/effects";
import followingsSectionSagas from "./ProfileSections/FollowingsSection/followingsSectionSagas";
import followersSectionSagas from "./ProfileSections/FollowersSection/followersSectionSagas";
import userAPI from "api/userAPI";
import userProfileAPI from "api/userProfileAPI";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import { actions, getProfile } from "./profileSlice";
import { actions as commonActions } from "redux/commonSlice";

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
  const { id } = getProfile(yield select());
  yield call(userProfileAPI.updateStatus, id, text);
}

function* watchSetStatus() {
  yield takeLatest(actions.setStatus.type, setStatus);
}

function* deleteProfile() {
  const { id } = getProfile(yield select());
  yield call(userProfileAPI.deleteProfile, id);
  yield put(commonActions.clearUser());
}

function* watchDeleteProfile() {
  yield takeLatest(actions.deleteProfile.type, deleteProfile);
}

export default function* profileSagas() {
  yield all([
    watchFetchProfile(),
    watchSetStatus(),
    watchDeleteProfile(),
    followingsSectionSagas(),
    followersSectionSagas(),
  ]);
}
