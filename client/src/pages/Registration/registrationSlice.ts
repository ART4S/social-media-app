import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import RegistrationVm from "model/registration/registrationVm";
import { AppState } from "redux/store";

const name = "registration";

interface RegistrationState {
  isSubmitting: boolean;
  errors: string[];
}

const initialState: RegistrationState = {
  isSubmitting: false,
  errors: [],
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    registerUser(state, action: PayloadAction<RegistrationVm>) {
      state.isSubmitting = true;
      state.errors = [];
    },
    registerUserSucceed(state, action: Action) {
      state.isSubmitting = false;
    },
    registerUserFailed(state, { payload }: PayloadAction<string[]>) {
      state.isSubmitting = false;
      state.errors = payload;
    },
  },
});

export const actions = slice.actions;

const getSelf = (state: AppState) => state.registration;

export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export const getErrors = (state: AppState) => getSelf(state).errors;

export default slice.reducer;
