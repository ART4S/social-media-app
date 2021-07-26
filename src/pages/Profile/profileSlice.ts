import {
  Action,
  combineReducers,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import type UserProfileDto from "model/dto/userProfile/UserProfileDto";
import { getUser } from "redux/commonSlice";
import { AppState } from "redux/store";

import followersSectionReducer from "./ProfileSections/FollowersSection/followersSectionSlice";
import followingsSectionReducer from "./ProfileSections/FollowingsSection/followingsSectionSlice";

const name = "profile";

interface ProfileState {
  loaded: boolean;
  profile?: UserProfileDto;
}

const initialState: ProfileState = {
  loaded: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setStatus(state, { payload }: PayloadAction<string>) {
      const { profile } = state;
      if (profile) {
        profile.status = payload;
      }
    },
    fetchProfile(state, action: PayloadAction<string>) {
      state.loaded = false;
    },
    fetchProfileSucceed(state, { payload }: PayloadAction<UserProfileDto>) {
      state.loaded = true;
      state.profile = payload;
    },
    toggleFollowProfile(state, action: Action) {
      if (state.profile) {
        state.profile.isCurrentUserFollow = !state.profile.isCurrentUserFollow;
      }
    },
    reset(state, action: Action) {
      state.loaded = false;
    },
  },
});

export const actions = {
  ...slice.actions,
  deleteProfile: createAction(`${name}/delete`),
};

const getSelf = (state: AppState) => state.profile.common;

export const getLoaded = (state: AppState) => getSelf(state).loaded;

export const getProfile = (state: AppState) => getSelf(state).profile!;

export const getIsCurrentUserProfile = (state: AppState) =>
  getProfile(state).userId === getUser(state)?.id;

const reducer = combineReducers({
  common: slice.reducer,
  followingsSection: followingsSectionReducer,
  followersSection: followersSectionReducer,
});

export default reducer;
