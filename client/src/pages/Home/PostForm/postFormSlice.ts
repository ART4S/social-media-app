import {
  Action,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import PostCreateDto from "model/dto/post/PostCreateDto";
import { AppState } from "redux/store";

const sliceName = "home/postForm";

interface PostFormState {
  isSubmitting: boolean;
}

const initialState: PostFormState = {
  isSubmitting: false,
};

const slice = createSlice({
  name: sliceName,
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

export const actions = slice.actions;

const getSelf = (state: AppState) => state.home.postForm;

export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export default slice.reducer;
