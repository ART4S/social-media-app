import { Action, createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type UserDto from "model/dto/user/UserDto";
import { AppState } from "redux/store";

const name = "home/userList";

interface UserSearchState {
  loading: boolean;
  searchText: string;
  users: UserDto[];
}

const initialState: UserSearchState = {
  loading: false,
  searchText: "",
  users: [],
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.searchText = payload;
    },
    searchStarted(state, action: Action) {
      state.loading = true;
    },
    searchSucceed(state, { payload }: PayloadAction<UserDto[]>) {
      state.users = payload;
      state.loading = false;
    },
  },
});

export const actions = {
  ...slice.actions,
  changeSearchText: createAction<string>(`${name}/changeSearchText`),
  searchUsers: createAction(`${name}/searchUsers`),
};

const getSelf = (state: AppState) => state.home.userList;

export const getLoading = (state: AppState) => getSelf(state).loading;

export const getSearchText = (state: AppState) => getSelf(state).searchText;

export const getUsers = (state: AppState) => getSelf(state).users;

export default slice.reducer;
