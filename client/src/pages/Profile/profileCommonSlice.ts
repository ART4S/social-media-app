import {
  Action,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import { AppState } from "redux/store";

const name = "profile/common";

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
    fetchProfileStarted(state, action: Action) {
      state.loading = true;
    },
    fetchProfileSucceed(state, { payload }: PayloadAction<UserProfileDto>) {
      state.loading = false;
      state.profile = payload;
    },
  },
});

export const actions = {
  ...slice.actions,
  fetchProfile: createAction<string>(`${name}/fetchProfile`),
};

const getSelf = (state: AppState) => state.profile.common;
export const getLoading = (state: AppState) => getSelf(state).loading;
export const getProfile = (state: AppState) => getSelf(state).profile!;

export default slice.reducer;
