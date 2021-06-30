import {
  createSlice,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import PostDto from "model/PostDto";

const postsAdapter: EntityAdapter<PostDto> = createEntityAdapter<PostDto>();

type InitialStateType = {
  data: {
    posts: ReturnType<typeof postsAdapter.getInitialState>;
  };
};

const initialState: InitialStateType = {
  data: {
    posts: postsAdapter.getInitialState(),
  },
};

const slice = createSlice({ name: "home", initialState, reducers: {} });
