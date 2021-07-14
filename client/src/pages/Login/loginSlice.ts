import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserDto from "model/dto/UserDto";
import { AppState } from "redux/store";
import { users } from "mock/data/users";

interface LoginState {
  loggedIn: boolean;
  user: UserDto | null;
}

const initialState: LoginState = {
  loggedIn: true,
  user: users[0],
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {},
});

const getSelf = (state: AppState) => state.login;
export const getLoggedIn = (state: AppState) => getSelf(state).loggedIn;
export const getUser = (state: AppState) => getSelf(state).user!;

export default slice.reducer;
