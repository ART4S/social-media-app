import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import UserDto from "model/dto/user/UserDto";
import { AppState } from "redux/store";

const name = "common";

interface CommonState {
  auth: {
    user: UserDto | null;
  };
}

const initialState: CommonState = {
  auth: {
    user: null,
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserDto | null>) {
      state.auth.user = payload;
    },
  },
});

export const actions = {
  ...slice.actions,
  fetchUser: createAction<string>(`${name}/fetchUser`),
};

const getSelf = (state: AppState) => state.common;

export const getUser = (state: AppState) => getSelf(state).auth.user!;

export default slice.reducer;
