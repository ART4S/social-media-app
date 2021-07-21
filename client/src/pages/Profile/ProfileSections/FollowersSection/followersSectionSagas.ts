import { put, call, takeLatest, select, all, takeEvery, delay } from "redux-saga/effects";

import userAPI from "api/userAPI";
import type FollowerDto from "model/dto/follower/FollowerDto";
import { getProfile } from "pages/Profile/profileSlice";

import { actions } from "./followersSectionSlice";

function* fetchFollowers(action: ReturnType<typeof actions.fetchFollowers>) {
  const { userId } = getProfile(yield select());

  const followers: FollowerDto[] = yield call(userAPI.getFollowers, userId);

  yield put(actions.fetchFollowersSucceed(followers));
}

function* watchFetchFollowers() {
  yield takeLatest(actions.fetchFollowers.type, fetchFollowers);
}

function* changeSearchText({ payload }: ReturnType<typeof actions.changeSearchText>) {
  yield put(actions.setSearchText(payload));

  yield delay(500);

  yield put(actions.searchFollowers());

  const { userId } = getProfile(yield select());

  const followings: FollowerDto[] = yield call(userAPI.searchFollowers, userId, payload);

  yield put(actions.searchFollowersSucceed(followings));
}

function* watchChangeSearchText() {
  yield takeLatest(actions.changeSearchText.type, changeSearchText);
}

function* blockFollower({ payload: followerId }: ReturnType<typeof actions.blockFollower>) {
  yield call(userAPI.deleteFollower, followerId);
}

function* watchBlockFollower() {
  yield takeEvery(actions.blockFollower.type, blockFollower);
}

export default function* followersSectionSagas() {
  yield all([watchFetchFollowers(), watchChangeSearchText(), watchBlockFollower()]);
}
