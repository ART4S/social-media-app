import {
  put,
  call,
  takeLatest,
  select,
  all,
  delay,
} from "@redux-saga/core/effects";
import { actions, getIsFollow } from "./followingsSectionSlice";
import userAPI from "api/userAPI";
import type FollowingDto from "model/dto/following/FollowingDto";
import { getProfile } from "pages/Profile/profileSlice";

function* fetchFollowings(action: ReturnType<typeof actions.fetchFollowings>) {
  const { userId } = getProfile(yield select());

  const followings: FollowingDto[] = yield call(userAPI.getFollowings, userId);

  yield put(actions.fetchFollowingsSucceed(followings));
}

function* watchFetchFollowings() {
  yield takeLatest(actions.fetchFollowings.type, fetchFollowings);
}

function* toggleFollow({
  payload: userId,
}: ReturnType<typeof actions.toggleFollow>) {
  yield delay(300);

  const isFollow = getIsFollow(yield select(), userId);

  if (isFollow) {
    yield call(userAPI.createFollowing, { userId });
  } else {
    yield call(userAPI.deleteFollowing, userId);
  }
}

function* watchToggleFollow() {
  yield takeLatest(actions.toggleFollow.type, toggleFollow);
}

function* changeSearchText({
  payload,
}: ReturnType<typeof actions.changeSearchText>) {
  yield put(actions.setSearchText(payload));

  yield delay(500);

  yield put(actions.searchFollowings());

  const { userId } = getProfile(yield select());

  const followings: FollowingDto[] = yield call(
    userAPI.searchFollowings,
    userId,
    payload,
  );

  yield put(actions.searchFollowingsSucceed(followings));
}

function* watchChangeSearchText() {
  yield takeLatest(actions.changeSearchText.type, changeSearchText);
}

export default function* followingsSectionSaga() {
  yield all([
    watchFetchFollowings(),
    watchToggleFollow(),
    watchChangeSearchText(),
  ]);
}
