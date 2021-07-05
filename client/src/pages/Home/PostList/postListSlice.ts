import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityState,
  PayloadAction,
  createSelector,
  unwrapResult,
} from "@reduxjs/toolkit";
import PostDto from "model/dto/PostDto";
import { AppDispatch, AppState } from "redux/store";
import postAPI from "api/postAPI";
import PostImageDto from "model/dto/PostImageDto";
import PostCommentDto from "model/dto/PostCommentDto";
import PagedResponse from "model/pagination/PagedResponse";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import PostCommentCreateDto from "model/dto/posts/PostCommentCreateDto";
import { getUser } from "pages/commonSlice";

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

export const getPostIds = (state: AppState) =>
  getSelf(state).posts.ids as string[];

export const getPostById = (state: AppState, postId: string) =>
  getSelf(state).posts.entities[postId]!;

export const getPostInfo = createSelector(
  getPostById,
  (post: Post) => post.info,
);

const getImagesEntity = createSelector(
  getPostById,
  (post: Post) => post.images,
);

export const getPostImages = createSelector(
  getImagesEntity,
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

const getPostCommentsEntity = createSelector(
  getPostById,
  (post: Post) => post.comments,
);

export const getPostCommentIds = createSelector(
  getPostCommentsEntity,
  (comments) => comments.ids as string[],
);

export const getPostCommentsPagination = createSelector(
  getPostCommentsEntity,
  (comments) => comments.pagination,
);

// TODO: найти альтернативу через createSelector
export const getPostCommentById = (
  state: AppState,
  postId: string,
  commentId: string,
) => getPostCommentsEntity(state, postId).entities[commentId]!;

export const getPostImageById = createSelector(
  getPostById,
  (_, imageId: string) => imageId,
  (post: Post, imageId: string) => post.images.entities[imageId]!,
);

const getSelectedImageCommentsEntity = createSelector(
  getSelectedImage,
  (image: SelectedImage | null) => image!.comments,
);

export const getSelectedImageComments = createSelector(
  getSelectedImageCommentsEntity,
  (comments) => Object.values(comments.entities).reverse() as ImageCommentDto[],
);

export const getSelectedImageCommentPagination = createSelector(
  getSelectedImageCommentsEntity,
  (comments) => comments.pagination,
);

export const fetchUserPosts = createAsyncThunk<
  PagedResponse<PostDto>,
  void,
  { state: AppState }
>(`${sliceName}/fetchUserPosts`, (_, thunkApi) => {
  const userId = getUser(thunkApi.getState())!.id;
  const { pagination } = getSelf(thunkApi.getState()).posts;
  return postAPI.getAll(userId, pagination);
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
  { state: AppState; dispatch: AppDispatch }
>(`${sliceName}/fetchMorePostComments`, (postId, thunkApi) =>
  thunkApi.dispatch(fetchPostComments(postId)).then(unwrapResult),
);

export const fetchSelectedImageComments = createAsyncThunk<
  PagedResponse<ImageCommentDto>,
  string,
  { state: AppState }
>(`${sliceName}/fetchSelectedImageComments`, (postId, thunkApi) => {
  const {
    comments: { pagination },
    info: { id },
  } = getSelectedImage(thunkApi.getState(), postId)!;
  return postAPI.getImageComments(id, pagination);
});

export const fetchMoreSelectedImageComments = createAsyncThunk<
  PagedResponse<ImageCommentDto>,
  string,
  { state: AppState; dispatch: AppDispatch }
>(`${sliceName}/fetchMoreSelectedImageComments`, (postId, thunkApi) =>
  thunkApi.dispatch(fetchSelectedImageComments(postId)).then(unwrapResult),
);

export const createPostComment = createAsyncThunk<
  void,
  { postId: string; comment: PostCommentCreateDto },
  { state: AppState; dispatch: AppDispatch }
>(`${sliceName}/createPostComment`, async ({ postId, comment }, thunkApi) => {
  await postAPI.createComment(postId, comment);
  await thunkApi.dispatch(fetchPostComments(postId));
});

export const deletePostComment = createAsyncThunk<
  void,
  { postId: string; commentId: string },
  { state: AppState; dispatch: AppDispatch }
>(`${sliceName}/deletePostComment`, async ({ postId, commentId }, thunkApi) => {
  await postAPI.deleteComment(commentId);
  await thunkApi.dispatch(fetchPostComments(postId));
});

export const notfyPostLiked = createAsyncThunk<
  void,
  string,
  { state: AppState }
>(`${sliceName}/notfyPostLiked`, async (postId, thunkApi) => {
  const state = thunkApi.getState();
  const userId = getUser(state)!.id;
  const post = getPostInfo(state, postId);

  if (post.liked) await postAPI.addLike(postId, userId);
  else await postAPI.removeLike(postId, userId);
});

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const postId = action.payload;
      const post = state.posts.entities[postId];
      if (post) {
        post.info.liked = !post.info.liked;
      }
    },
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
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        const { posts } = state;
        const { data, currentPage, totalPages, pageSize, totalItems } =
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
          const { data, currentPage, totalPages, pageSize, totalItems } =
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
      .addCase(fetchMorePostComments.pending, (state, action) => {
        const postId = action.meta.arg;
        const pagination = state.posts.entities[postId]?.comments.pagination;
        if (pagination) {
          pagination.itemsPerPage += 3;
        }
      })
      .addCase(fetchSelectedImageComments.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const post = state.posts.entities[postId];
        const imageComments = post?.selectedImage?.comments;
        if (imageComments) {
          const { data, currentPage, totalPages, pageSize, totalItems } =
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
      .addCase(fetchMoreSelectedImageComments.pending, (state, action) => {
        const postId = action.meta.arg;
        const pagination =
          state.posts.entities[postId]?.selectedImage?.comments.pagination;
        if (pagination) {
          pagination.itemsPerPage += 3;
        }
      });
  },
});

export const { setSelectedImageIndex, toggleLike } = slice.actions;

export default slice.reducer;
