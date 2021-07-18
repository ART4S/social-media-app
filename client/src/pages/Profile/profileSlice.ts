import { Action, combineReducers, createAction } from "@reduxjs/toolkit";
import followingsSectionReducer from "./ProfileSections/FollowingsSection/followingsSectionSlice";
import followersSectionReducer from "./ProfileSections/FollowersSection/followersSectionSlice";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import { getUser } from "redux/commonSlice";
import { AppState } from "redux/store";

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
      const profile = state.profile;
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
  getProfile(state).userId == getUser(state)?.id;

const reducer = combineReducers({
  common: slice.reducer,
  followingsSection: followingsSectionReducer,
  followersSection: followersSectionReducer,
});

export default reducer;
