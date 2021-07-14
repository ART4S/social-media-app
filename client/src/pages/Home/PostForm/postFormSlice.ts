import { Action, createAction, createSlice } from "@reduxjs/toolkit";
import PostCreateDto from "model/dto/posts/PostCreateDto";
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
    createPostStarted(state, action: Action) {
      state.isSubmitting = true;
    },
    createPostSucceed(state, action: Action) {
      state.isSubmitting = false;
    },
  },
});

export const actions = {
  ...slice.actions,

  createPost: createAction<PostCreateDto>(`${sliceName}/createPost`),
};

const getSelf = (state: AppState) => state.home.postForm;

export const getIsSubmitting = (state: AppState) => getSelf(state).isSubmitting;

export default slice.reducer;
