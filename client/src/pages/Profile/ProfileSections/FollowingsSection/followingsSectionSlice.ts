import {
  Action,
  createAction,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import FollowingDto from "model/dto/users/FollowingDto";
import { AppState } from "redux/store";

const name = "profile/followingsSection";

interface Following {
  info: FollowingDto;
  isFollow: boolean;
}

const followingAdapter = createEntityAdapter<Following>({
  selectId: (x) => x.info.userId,
});

interface FollowingsSectionState {
  loading: boolean;
  searchText: string;
  followings: EntityState<Following>;
}

const initialState: FollowingsSectionState = {
  loading: false,
  searchText: "",
  followings: followingAdapter.getInitialState(),
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.searchText = payload;
    },
    searchFollowings(state, action: Action) {
      state.loading = true;
    },
    searchFollowingsSucceed(state, { payload }: PayloadAction<FollowingDto[]>) {
      state.loading = false;
      followingAdapter.setAll(
        state.followings,
        payload.map((info) => ({ info, isFollow: true })),
      );
    },
    toggleFollow(state, { payload: userId }: PayloadAction<string>) {
      const following = state.followings.entities[userId];
      if (following) {
        following.isFollow = !following.isFollow;
      }
    },
    fetchFollowings(state, action: Action) {
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
  changeSearchText: createAction<string>(`${name}/changeSearchText`),
};

const getSelf = (state: AppState) => state.profile.followingsSection;

export const getFollowingIds = (state: AppState) =>
  getSelf(state).followings.ids as string[];

const getFollowing = (state: AppState, followingId: string) =>
  getSelf(state).followings.entities[followingId]!;

export const getFollowingInfo = (state: AppState, followingId: string) =>
  getFollowing(state, followingId).info;

export const getIsFollow = (state: AppState, userId: string) =>
  getFollowing(state, userId).isFollow;

export const getSearchText = (state: AppState) => getSelf(state).searchText;

export const getLoading = (state: AppState) => getSelf(state).loading;

export default slice.reducer;
