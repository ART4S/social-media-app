import { createSlice } from "@reduxjs/toolkit";

type UserSearchState = {};

const initialState: UserSearchState = {};

const slice = createSlice({
  name: "home/userSearch",
  initialState,
  reducers: {},
});

export default slice.reducer;
