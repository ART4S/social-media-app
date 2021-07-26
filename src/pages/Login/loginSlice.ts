import { Action, createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type LoginVm from "model/login/loginVm";
import { AppState } from "redux/store";

const name = "login";

interface LoginState {
  isSubmitting: boolean;
  errors: string[];
}

const initialState: LoginState = {
  isSubmitting: false,
  errors: [],
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginVm>) {
      state.isSubmitting = true;
      state.errors = [];
    },
    loginSucceed(state, action: Action) {
      state.isSubmitting = false;
    },
    loginFailed(state, { payload }: PayloadAction<string[]>) {
      state.isSubmitting = false;
      state.errors = payload;
    },
    reset(state) {
      state.isSubmitting = false;
      state.errors = [];
    },
  },
});

export const actions = {
  ...slice.actions,
  logout: createAction(`${name}/logout`),
};

const getSelf = (state: AppState) => state.login;

export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export const getErrors = (state: AppState) => getSelf(state).errors;

export default slice.reducer;
