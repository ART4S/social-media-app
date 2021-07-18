import { combineReducers } from "@reduxjs/toolkit";
import followingsSectionReducer from "./ProfileSections/FollowingsSection/followingsSectionSlice";
import followersSectionReducer from "./ProfileSections/FollowersSection/followersSectionSlice";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import { getUser } from "pages/commonSlice";
import { AppState } from "redux/store";

const name = "profile";

interface ProfileState {
  loading: boolean;
  profile?: UserProfileDto;
}

const initialState: ProfileState = {
  loading: true,
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
      state.loading = true;
    },
    fetchProfileSucceed(state, { payload }: PayloadAction<UserProfileDto>) {
      state.loading = false;
      state.profile = payload;
    },
  },
});

export const actions = slice.actions;

const getSelf = (state: AppState) => state.profile.common;

export const getLoading = (state: AppState) => getSelf(state).loading;

export const getProfile = (state: AppState) => getSelf(state).profile!;

export const getIsCurrentUserProfile = (state: AppState) =>
  getProfile(state).userId == getUser(state)?.id;

const reducer = combineReducers({
  common: slice.reducer,
  followingsSection: followingsSectionReducer,
  followersSection: followersSectionReducer,
});

export default reducer;
