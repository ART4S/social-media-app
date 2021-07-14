import { createSlice } from "@reduxjs/toolkit";

interface SearchBarState {}

const initialState: SearchBarState = {};

const slice = createSlice({ name: "searchBar", initialState, reducers: {} });

export default slice.reducer;
