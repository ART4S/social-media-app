import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserProfileInfoDto from "model/dto/userProfiles/UserProfileInfoDto";
import UserProfileEditDto from "model/dto/userProfiles/UserProfileEditDto";
import { AppState } from "redux/store";

const name = "profileEditor";

interface ProfileEditorState {
  loading: boolean;
  isSubmitting: boolean;
  profile: UserProfileInfoDto | null;
}

const initialState: ProfileEditorState = {
  loading: true,
  isSubmitting: false,
  profile: null,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    fetchProfile(state, { payload }: PayloadAction<string>) {
      state.loading = true;
    },
    fetchProfileSucceed(state, { payload }: PayloadAction<UserProfileInfoDto>) {
      state.loading = false;
      state.profile = payload;
    },
    saveProfile(state, action: PayloadAction<UserProfileEditDto>) {
      state.isSubmitting = true;
    },
    saveProfileSucceed(state, action: AnyAction) {
      state.isSubmitting = false;
    },
  },
});

export const actions = {
  ...slice.actions,
};

const getSelf = (state: AppState) => state.profileEditor;

export const getLoading = (state: AppState) => getSelf(state).loading;
export const getProfile = (state: AppState) => getSelf(state).profile!;
export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export default slice.reducer;
