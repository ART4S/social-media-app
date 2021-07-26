import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type UserProfileInfoDto from "model/dto/userProfile/UserProfileInfoDto";
import type UserProfileEditDto from "model/dto/userProfile/UserProfileEditDto";
import type { AppState } from "redux/store";

const name = "profileEditor";

interface ProfileEditorState {
  loaded: boolean;
  isSubmitting: boolean;
  submitted: boolean;
  profile: UserProfileInfoDto | null;
}

const initialState: ProfileEditorState = {
  loaded: false,
  isSubmitting: false,
  submitted: false,
  profile: null,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    fetchProfile(state, { payload }: PayloadAction<string>) {
      state.loaded = false;
    },
    fetchProfileSucceed(state, { payload }: PayloadAction<UserProfileInfoDto>) {
      state.loaded = true;
      state.profile = payload;
    },
    saveProfile(state, action: PayloadAction<UserProfileEditDto>) {
      state.isSubmitting = true;
    },
    saveProfileSucceed(state, action: AnyAction) {
      state.isSubmitting = false;
      state.submitted = true;
    },
    reset(state) {
      state.submitted = false;
    },
  },
});

export const { actions } = slice;

const getSelf = (state: AppState) => state.profileEditor;

export const getLoaded = (state: AppState) => getSelf(state).loaded;

export const getProfile = (state: AppState) => getSelf(state).profile!;

export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export const getSubmitted = (state: AppState) => getSelf(state).submitted;

export default slice.reducer;
