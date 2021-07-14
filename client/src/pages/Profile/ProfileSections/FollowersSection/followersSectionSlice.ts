import {
  Action,
  createAction,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import FollowerDto from "model/dto/users/FollowerDto";
import { AppState } from "redux/store";

const name = "profile/followersSection";

interface Follower {
  info: FollowerDto;
  blocked: boolean;
}

const followerAdapter = createEntityAdapter<Follower>({
  selectId: (x) => x.info.followerId,
});

interface FollowersSectionState {
  loading: boolean;
  searchText: string;
  followers: EntityState<Follower>;
}

const initialState: FollowersSectionState = {
  loading: false,
  searchText: "",
  followers: followerAdapter.getInitialState(),
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.searchText = payload;
    },
    searchFollowers(state, action: Action) {
      state.loading = true;
    },
    searchFollowersSucceed(state, { payload }: PayloadAction<FollowerDto[]>) {
      state.loading = false;
      followerAdapter.setAll(
        state.followers,
        payload.map((info) => ({ info, blocked: false })),
      );
    },
    blockFollower(state, { payload: followerId }: PayloadAction<string>) {
      const following = state.followers.entities[followerId];
      if (following) {
        following.blocked = true;
      }
    },
    fetchFollowers(state, action: Action) {
      state.loading = true;
    },
    fetchFollowersSucceed(state, { payload }: PayloadAction<FollowerDto[]>) {
      state.loading = false;
      followerAdapter.setAll(
        state.followers,
        payload.map((info) => ({
          info,
          blocked: false,
        })),
      );
    },
  },
});

export const actions = {
  ...slice.actions,
  changeSearchText: createAction<string>(`${name}/changeSearchText`),
};

const getSelf = (state: AppState) => state.profile.followersSection;

export const getFollowerIds = (state: AppState) =>
  getSelf(state).followers.ids as string[];

const getFollower = (state: AppState, followerId: string) =>
  getSelf(state).followers.entities[followerId]!;

export const getFollowerInfo = (state: AppState, followerId: string) =>
  getFollower(state, followerId).info;

export const getBlocked = (state: AppState, followerId: string) =>
  getFollower(state, followerId).blocked;

export const getSearchText = (state: AppState) => getSelf(state).searchText;

export const getLoading = (state: AppState) => getSelf(state).loading;

export default slice.reducer;
