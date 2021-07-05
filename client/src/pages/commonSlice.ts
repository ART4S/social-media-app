import { createSlice } from "@reduxjs/toolkit";
import UserDto from "model/dto/UserDto";
import { AppState } from "redux/store";
import { users } from "mock/data/users";

interface CommonState {
  auth: {
    userId: string | null;
    user: UserDto | null;
  };
}

const initialState: CommonState = {
  auth: {
    userId: users[0].id,
    user: users[0],
  },
};

const getSelf = (state: AppState) => state.common;

export const getUser = (state: AppState) => getSelf(state).auth.user;

const slice = createSlice({
  name: "common",
  initialState,
  reducers: {},
});

export default slice.reducer;
