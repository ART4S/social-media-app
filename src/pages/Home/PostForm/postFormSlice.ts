import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type PostCreateDto from "model/dto/post/PostCreateDto";
import type { AppState } from "redux/store";

const name = "home/postForm";

interface PostFormState {
  isSubmitting: boolean;
}

const initialState: PostFormState = {
  isSubmitting: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    createPost(state, action: PayloadAction<PostCreateDto>) {
      state.isSubmitting = true;
    },
    createPostSucceed(state, action: Action) {
      state.isSubmitting = false;
    },
  },
});

export const { actions } = slice;

const getSelf = (state: AppState) => state.home.postForm;

export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export default slice.reducer;
