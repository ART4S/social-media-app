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
import { getUser } from "pages/Login/loginSlice";
import UserDto from "model/dto/UserDto";
import FollowingDto from "model/dto/users/FollowingDto";

function* fetchFollowings(action: ReturnType<typeof actions.fetchFollowings>) {
  yield put(actions.fetchFollowingsStarted());

  const user: UserDto = yield select(getUser);

  const followings: FollowingDto[] = yield call(userAPI.getFollowings, user.id);

  yield put(actions.fetchFollowingsSucceed(followings));
}

function* watchFetchFollowings() {
  yield takeLatest(actions.fetchFollowings.type, fetchFollowings);
}

function* toggleFollowing({
  payload: userId,
}: ReturnType<typeof actions.toggleFollowing>) {
  yield put(actions.toggleFollowStarted(userId));

  yield delay(500);

  const isFollow = getIsFollow(yield select(), userId);

  if (isFollow) yield call(userAPI.createFollowing, { userId });
  else yield call(userAPI.deleteFollowing, userId);
}

function* watchToggleFollowing() {
  yield takeLatest(actions.toggleFollowing.type, toggleFollowing);
}

export default function* followingsSectionSaga() {
  yield all([watchFetchFollowings(), watchToggleFollowing()]);
}
