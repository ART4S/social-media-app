import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityState,
  PayloadAction,
  createAction,
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
import postService from "mock/services/postService";

const sliceName = "home/postList";

const postAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.info.id,
});
const imageAdapter = createEntityAdapter<PostImage>();
const commentAdapter = createEntityAdapter<PostCommentDto>();
const imageCommentAdapter = createEntityAdapter<ImageCommentDto>();

interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  itemsPerPage: number;
}

interface PostImage {
  info: PostImageDto;
  comments: EntityState<ImageCommentDto> & {
    pagination: Pagination;
  };
}

export interface Post {
  info: PostDto;
  selectedImageId: string | null;
  images: EntityState<PostImage>;
  comments: EntityState<PostCommentDto> & {
    pagination: Pagination;
  };
  commentForm: {
    isSubmitAreaVisible: boolean;
  };
}

export interface PostListState {
  loading: boolean;
  posts: EntityState<Post> & {
    pagination: Pagination;
  };
}

const initialState: PostListState = {
  loading: false,
  posts: postAdapter.getInitialState({
    pagination: {
      currentPage: 1,
      totalPages: 0,
      pageSize: 0,
      totalItems: 0,
      itemsPerPage: 5,
    },
  }),
};

export const getSelf = (state: AppState) => state.home.postList;

export const getPostIds = (state: AppState) =>
  getSelf(state).posts.ids as string[];

export const getPostById = (state: AppState, postId: string) =>
  getSelf(state).posts.entities[postId]!;

export const getPostInfo = createSelector(
  getPostById,
  (post: Post) => post.info,
);

const getPostImagesEntity = createSelector(
  getPostById,
  (post: Post) => post.images,
);

export const getPostImagesInfo = createSelector(
  getPostImagesEntity,
  (images) => {
    return Object.values(images.entities).map((x) => x!.info) as PostImageDto[];
  },
);

export const getSelectedImage = createSelector(
  getPostById,
  (post: Post) => post.images.entities[post.selectedImageId!]!,
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

export const getPostImageById = (
  state: AppState,
  postId: string,
  imageId: string,
) => getPostImagesEntity(state, postId).entities[imageId]!;

const getImageCommentsEntity = createSelector(
  getPostImageById,
  (image: PostImage) => image!.comments,
);

export const getImageCommentIds = createSelector(
  getImageCommentsEntity,
  (comments) => Array.from(comments.ids).reverse() as string[],
);

export const getImageCommentsPagination = createSelector(
  getImageCommentsEntity,
  (comments) => comments.pagination,
);

export const getImageCommentById = (
  state: AppState,
  postId: string,
  commentId: string,
) => getImageCommentsEntity(state, postId).entities[commentId]!;

export const getPostCommentSubmitAreaVisibility = (
  state: AppState,
  postId: string,
) => getPostById(state, postId).commentForm.isSubmitAreaVisible;

export const getSelectedImageId = createSelector(
  getPostById,
  (post: Post) => post.selectedImageId,
);

export const fetchUserPosts = createAction(`${sliceName}/fetchUserPosts`);

export const fetchPostImages = createAction<string>(
  `${sliceName}/fetchPostImages`,
);

export const fetchPostComments = createAction<string>(
  `${sliceName}/fetchPostComments`,
);

export const fetchMorePostComments = createAction<string>(
  `${sliceName}/fetchMorePostComments`,
);

export const fetchImageComments = createAction<{
  postId: string;
  imageId: string;
}>(`${sliceName}/fetchImageComments`);

export const fetchMoreImageComments = createAction<{
  postId: string;
  imageId: string;
}>(`${sliceName}/fetchMoreImageComments`);

export const createPostComment = createAction<{
  postId: string;
  comment: PostCommentCreateDto;
}>(`${sliceName}/createPostComment`);

export const deletePostComment = createAction<{
  postId: string;
  commentId: string;
}>(`${sliceName}/deletePostComment`);

export const notifyPostLiked = createAction<string>(
  `${sliceName}/notifyPostLiked`,
);

export const notifyPostImageLiked = createAction<{
  postId: string;
  imageId: string;
}>(`${sliceName}/notifyPostImageLiked`);

export const deleteImageComment = createAction<{
  postId: string;
  imageId: string;
  commentId: string;
}>(`${sliceName}/deleteImageComment`);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    showPostCommentSubmitArea(
      state,
      action: PayloadAction<{ postId: string; visibility: boolean }>,
    ) {
      const { postId, visibility } = action.payload;
      const commentForm = state.posts.entities[postId]?.commentForm;
      if (commentForm) {
        commentForm.isSubmitAreaVisible = visibility;
      }
    },
    togglePostLike(state, { payload: postId }: PayloadAction<string>) {
      const post = state.posts.entities[postId]?.info;
      if (post) {
        post.liked = !post.liked;
      }
    },
    togglePostImageLike(
      state,
      action: PayloadAction<{ postId: string; imageId: string }>,
    ) {
      const { postId, imageId } = action.payload;
      const image =
        state.posts.entities[postId]?.images.entities[imageId]?.info;
      if (image) {
        image.liked = !image.liked;
      }
    },
    setSelectedImageId(
      state,
      action: PayloadAction<{ postId: string; imageId: string | null }>,
    ) {
      const { postId, imageId } = action.payload;
      const post = state.posts.entities[postId];
      if (post) {
        post.selectedImageId = imageId;
      }
    },
    fetchUserPostsSucceed(
      state,
      { payload: response }: PayloadAction<PagedResponse<PostDto>>,
    ) {
      const { posts } = state;

      postAdapter.setAll(
        posts,
        response.data.map((info) => ({
          info,
          selectedImageId: null,
          images: imageAdapter.getInitialState(),
          comments: commentAdapter.getInitialState({
            pagination: {
              currentPage: 1,
              totalPages: 0,
              pageSize: 0,
              totalItems: 0,
              itemsPerPage: 3,
            },
          }),
          commentForm: {
            isSubmitAreaVisible: false,
          },
        })),
      );

      const pagination: Omit<PagedResponse<PostCommentDto>, "data"> = response;

      posts.pagination = {
        ...posts.pagination,
        ...pagination,
      };
    },
    fetchPostImagesSucceed(
      state,
      action: PayloadAction<{ postId: string; data: PostImageDto[] }>,
    ) {
      const { postId, data } = action.payload;
      const images = state.posts.entities[postId]?.images;
      if (images) {
        imageAdapter.setAll(
          images,
          data.map((info) => ({
            info,
            comments: imageCommentAdapter.getInitialState({
              pagination: {
                currentPage: 1,
                totalPages: 0,
                pageSize: 0,
                totalItems: 0,
                itemsPerPage: 3,
              },
            }),
          })),
        );
      }
    },
    fetchImageCommentsSucceed(
      state,
      action: PayloadAction<{
        postId: string;
        imageId: string;
        response: PagedResponse<ImageCommentDto>;
      }>,
    ) {
      const { postId, imageId, response } = action.payload;

      const comments =
        state.posts.entities[postId]?.images.entities[imageId]?.comments;

      if (comments) {
        imageCommentAdapter.setAll(comments, response.data);

        const pagination: Omit<
          PagedResponse<PostCommentDto>,
          "data"
        > = response;

        comments.pagination = {
          ...comments.pagination,
          ...pagination,
        };
      }
    },
    fetchMoreImageCommentsStarted(
      state,
      action: PayloadAction<{ postId: string; imageId: string }>,
    ) {
      const { postId, imageId } = action.payload;

      const pagination =
        state.posts.entities[postId]?.images.entities[imageId]?.comments
          .pagination;

      if (pagination) {
        pagination.itemsPerPage += 3;
      }
    },
    fetchPostCommentsSucceed(
      state,
      action: PayloadAction<{
        postId: string;
        response: PagedResponse<PostCommentDto>;
      }>,
    ) {
      const { postId, response } = action.payload;
      const comments = state.posts.entities[postId]?.comments;
      if (comments) {
        commentAdapter.setAll(comments, response.data);

        const pagination: Omit<
          PagedResponse<PostCommentDto>,
          "data"
        > = response;

        comments.pagination = {
          ...comments.pagination,
          ...pagination,
        };
      }
    },
    fetchMorePostCommentsStarted(
      state,
      { payload: postId }: PayloadAction<string>,
    ) {
      const pagination = state.posts.entities[postId]?.comments.pagination;
      if (pagination) {
        pagination.itemsPerPage += 3;
      }
    },
  },
});

export const {
  setSelectedImageId,
  togglePostLike,
  togglePostImageLike,
  showPostCommentSubmitArea,
  fetchImageCommentsSucceed,
  fetchUserPostsSucceed,
  fetchPostImagesSucceed,
  fetchMoreImageCommentsStarted,
  fetchPostCommentsSucceed,
  fetchMorePostCommentsStarted,
} = slice.actions;

export default slice.reducer;
