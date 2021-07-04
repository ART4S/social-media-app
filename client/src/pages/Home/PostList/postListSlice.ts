import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityState,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import PostDto from "model/dto/PostDto";
import { AppState } from "redux/store";
import postAPI from "api/postAPI";
import PostImageDto from "model/dto/PostImageDto";
import PostCommentDto from "model/dto/PostCommentDto";
import PagedResponse from "model/pagination/PagedResponse";
import { ImageCommentDto } from "model/dto/ImageCommentDto";

const sliceName = "home/postList";

const postAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.info.id,
});
const commentAdapter = createEntityAdapter<PostCommentDto>();
const imageAdapter = createEntityAdapter<PostImageDto>();
const imageCommentAdapter = createEntityAdapter<ImageCommentDto>();

interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface SelectedImage {
  info: PostImageDto;
  comments: EntityState<ImageCommentDto> & {
    pagination: Pagination;
  };
}

export interface Post {
  info: PostDto;
  selectedImage: SelectedImage | null;
  selectedImageIndex: number | null;
  images: EntityState<PostImageDto>;
  comments: EntityState<PostCommentDto> & {
    pagination: Pagination;
  };
}

interface PostListState {
  loading: boolean;
  posts: EntityState<Post> & {
    pagination: Pagination;
  };
}

const postsInitialState = postAdapter.getInitialState({
  pagination: {
    currentPage: 1,
    totalPages: 0,
    pageSize: 0,
    totalItems: 0,
    itemsPerPage: 5,
  },
});

const commentInitialState = commentAdapter.getInitialState({
  pagination: {
    currentPage: 1,
    totalPages: 0,
    pageSize: 0,
    totalItems: 0,
    itemsPerPage: 3,
  },
});

const imageInitialState = imageAdapter.getInitialState();

const imageCommentInitialState = imageCommentAdapter.getInitialState({
  pagination: {
    currentPage: 1,
    totalPages: 0,
    pageSize: 0,
    totalItems: 0,
    itemsPerPage: 3,
  },
});

const initialState: PostListState = {
  loading: false,
  posts: postsInitialState,
};

const getSelf = (state: AppState) => state.home.postList;

export const { selectAll: selectPosts, selectIds: selectPostIds } =
  postAdapter.getSelectors<AppState>((state) => getSelf(state).posts);

export const getPostById = (state: AppState, postId: string) =>
  getSelf(state).posts.entities[postId]!;

export const getPostInfo = createSelector(
  getPostById,
  (post: Post) => post.info,
);

const getImageEntities = createSelector(
  getPostById,
  (post: Post) => post.images,
);

export const getPostImages = createSelector(
  getImageEntities,
  (images) => Object.values(images.entities) as PostImageDto[],
);

export const getSelectedImage = createSelector(
  getPostById,
  (post: Post) => post.selectedImage,
);

export const getSelectedImageInfo = createSelector(
  getSelectedImage,
  (image) => image!.info,
);

export const getSelectedImageIndex = createSelector(
  getPostById,
  (post: Post) => post.selectedImageIndex,
);

const getCommentEntities = createSelector(
  getPostById,
  (post: Post) => post.comments,
);

export const getPostComments = createSelector(
  getCommentEntities,
  (comments) => Object.values(comments.entities) as PostCommentDto[],
);

export const getCommentPagination = createSelector(
  getPostById,
  (post: Post) => post.comments.pagination,
);

export const getPostImageById = createSelector(
  getPostById,
  (_, imageId: string) => imageId,
  (post: Post, imageId: string) => post.images.entities[imageId]!,
);

const getSelectedImageCommentEntities = createSelector(
  getSelectedImage,
  (image: SelectedImage | null) => image!.comments.entities,
);

export const getSelectedImageComments = createSelector(
  getSelectedImageCommentEntities,
  (comments) => Object.values(comments).reverse() as ImageCommentDto[],
);

export const getSelectedImageCommentPagination = createSelector(
  getSelectedImage,
  (image: SelectedImage | null) => image!.comments.pagination,
);

export const fetchPosts = createAsyncThunk<
  PagedResponse<PostDto>,
  string,
  { state: AppState }
>(`${sliceName}/fetchPosts`, (authorId, thunkApi) => {
  const { pagination } = getSelf(thunkApi.getState()).posts;
  return postAPI.getAll(authorId, pagination);
});

export const fetchPostImages = createAsyncThunk(
  `${sliceName}/fetchPostImages`,
  (postId: string) => postAPI.getImages(postId),
);

export const fetchPostComments = createAsyncThunk<
  PagedResponse<PostCommentDto>,
  string,
  { state: AppState }
>(`${sliceName}/fetchPostComments`, (postId, thunkApi) => {
  const { pagination } = getPostById(thunkApi.getState(), postId)!.comments;
  return postAPI.getComments(postId, pagination);
});

export const fetchMorePostComments = createAsyncThunk<
  PagedResponse<PostCommentDto>,
  string,
  { state: AppState }
>(`${sliceName}/fetchMorePostComments`, (postId, thunkApi) => {
  const { pagination } = getPostById(thunkApi.getState(), postId)!.comments;
  return postAPI.getComments(postId, {
    ...pagination,
    currentPage: pagination.currentPage + 1,
  });
});

export const fetchSelectedImageComments = createAsyncThunk<
  PagedResponse<ImageCommentDto>,
  string,
  { state: AppState }
>(`${sliceName}/fetchSelectedImageComments`, (postId, thunkApi) => {
  const {
    comments: { pagination },
    info: { id },
  } = getSelectedImage(thunkApi.getState(), postId)!;
  return postAPI.getImageComments(postId, id, pagination);
});

export const fetchMoreSelectedImageComments = createAsyncThunk<
  PagedResponse<ImageCommentDto>,
  string,
  { state: AppState }
>(`${sliceName}/fetchMoreSelectedImageComments`, (postId, thunkApi) => {
  const {
    comments: { pagination },
    info: { id },
  } = getSelectedImage(thunkApi.getState(), postId)!;
  return postAPI.getImageComments(postId, id, {
    ...pagination,
    currentPage: pagination.currentPage + 1,
  });
});

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setSelectedImageIndex(
      state,
      action: PayloadAction<{ postId: string; index: number | null }>,
    ) {
      const { postId, index } = action.payload;
      const post = state.posts.entities[postId];
      if (post) {
        const images = Object.values(post.images.entities) as PostImageDto[];
        if (index !== null && images.length > index) {
          post.selectedImage = {
            info: images[index],
            comments: imageCommentInitialState,
          };
        } else {
          post.selectedImage = null;
        }
        post.selectedImageIndex = index;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { posts } = state;
        const { currentPage, totalPages, pageSize, totalItems, data } =
          action.payload;

        postAdapter.setAll(
          posts,
          data.map((info) => ({
            info,
            selectedImage: null,
            selectedImageIndex: null,
            images: imageInitialState,
            comments: commentInitialState,
          })),
        );

        posts.pagination = {
          ...posts.pagination,
          currentPage,
          totalPages,
          pageSize,
          totalItems,
        };
      })
      .addCase(fetchPostImages.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const images = state.posts.entities[postId]?.images;
        if (images) {
          imageAdapter.setAll(images, action.payload);
        }
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const comments = state.posts.entities[postId]?.comments;
        if (comments) {
          const { currentPage, totalPages, pageSize, totalItems, data } =
            action.payload;

          commentAdapter.setAll(comments, data);

          comments.pagination = {
            ...comments.pagination,
            currentPage,
            totalPages,
            pageSize,
            totalItems,
          };
        }
      })
      .addCase(fetchMorePostComments.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const comments = state.posts.entities[postId]?.comments;
        if (comments) {
          const { currentPage, pageSize, totalPages, totalItems, data } =
            action.payload;

          commentAdapter.upsertMany(comments, data);

          comments.pagination = {
            ...comments.pagination,
            currentPage,
            totalPages,
            pageSize,
            totalItems,
          };
        }
      })
      .addCase(fetchSelectedImageComments.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const post = state.posts.entities[postId];
        const imageComments = post?.selectedImage?.comments;
        if (imageComments) {
          const { currentPage, totalPages, pageSize, totalItems, data } =
            action.payload;

          imageCommentAdapter.setAll(imageComments, data);

          imageComments.pagination = {
            ...imageComments.pagination,
            currentPage,
            totalPages,
            pageSize,
            totalItems,
          };
        }
      })
      .addCase(fetchMoreSelectedImageComments.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const post = state.posts.entities[postId];
        const imageComments = post?.selectedImage?.comments;
        if (imageComments) {
          const { currentPage, totalPages, pageSize, totalItems, data } =
            action.payload;

          imageCommentAdapter.upsertMany(imageComments, data);

          imageComments.pagination = {
            ...imageComments.pagination,
            currentPage,
            totalPages,
            pageSize,
            totalItems,
          };
        }
      });
  },
});

export const { setSelectedImageIndex } = slice.actions;

export default slice.reducer;
