import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import LoginVm from "model/login/loginVm";
import { AppState } from "redux/store";

interface LoginState {
  isSubmitting: boolean;
  errors: string[];
}

const initialState: LoginState = {
  isSubmitting: false,
  errors: [],
};

const slice = createSlice({
  name: "login",
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
    logout(state, action: Action) {},
  },
});

export const actions = slice.actions;

const getSelf = (state: AppState) => state.login;

export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export const getErrors = (state: AppState) => getSelf(state).errors;

export default slice.reducer;
