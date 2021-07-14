import {
  Action,
  createAction,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import FollowDto from "model/dto/users/FollowerDto";
import FollowingDto from "model/dto/users/FollowingDto";
import { AppState } from "redux/store";

const name = "profile/followingsSection";

interface Follow {
  info: FollowingDto;
  isFollow: boolean;
}

const followingAdapter = createEntityAdapter<Follow>({
  selectId: (x) => x.info.userId,
});

interface FollowingListState {
  loading: boolean;
  followings: EntityState<Follow>;
}

const initialState: FollowingListState = {
  loading: false,
  followings: followingAdapter.getInitialState(),
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    toggleFollowStarted(state, { payload: userId }: PayloadAction<string>) {
      const following = state.followings.entities[userId];
      if (following) {
        following.isFollow = !following.isFollow;
      }
    },
    fetchFollowingsStarted(state, action: Action) {
      state.loading = true;
    },
    fetchFollowingsSucceed(state, { payload }: PayloadAction<FollowingDto[]>) {
      state.loading = false;
      followingAdapter.setAll(
        state.followings,
        payload.map((info) => ({
          info,
          isFollow: true,
        })),
      );
    },
  },
});

export const actions = {
  ...slice.actions,
  fetchFollowings: createAction(`${name}/fetchFollowings`),
  toggleFollowing: createAction<string>(`${name}/toggleFollowing`),
};

const getSelf = (state: AppState) => state.profile.followingsSection;

export const getFollowingIds = (state: AppState) =>
  getSelf(state).followings.ids as string[];

const getFollowing = (state: AppState, followingId: string) =>
  getSelf(state).followings.entities[followingId]!;

export const getFollowingById = (state: AppState, followingId: string) =>
  getFollowing(state, followingId).info;

export const getIsFollow = (state: AppState, followingId: string) =>
  getFollowing(state, followingId).isFollow;

export default slice.reducer;
