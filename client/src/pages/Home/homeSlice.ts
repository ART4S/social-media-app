import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityAdapter,
} from "@reduxjs/toolkit";
import PostDto from "model/PostDto";
import { AppState } from "redux/store";
import postAPI from "api/postAPI";

const postsAdapter: EntityAdapter<PostDto> = createEntityAdapter<PostDto>();
const posts = postsAdapter.getInitialState({
  loading: false,
});

interface HomeState {
  data: {
    posts: typeof posts;
  };
}

const initialState: HomeState = {
  data: {
    posts,
  },
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.data.posts.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.data.posts.loading = false;
      });
  },
});

export const fetchPosts = createAsyncThunk("home/fetchPosts", () =>
  postAPI.getAll(),
);

export const { selectAll: getAllPosts } = postsAdapter.getSelectors<AppState>(
  (state) => state.home.data.posts,
);

export default slice.reducer;
