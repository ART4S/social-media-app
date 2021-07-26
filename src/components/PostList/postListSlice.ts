import {
  createSlice,
  createEntityAdapter,
  EntityState,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";

import type { AppState } from "redux/store";
import type PostDto from "model/dto/post/PostDto";
import type PostImageDto from "model/dto/postImage/PostImageDto";
import type PostCommentDto from "model/dto/postComment/PostCommentDto";
import type PagedResponse from "model/pagination/PagedResponse";
import type ImageCommentDto from "model/dto/imageComment/ImageCommentDto";
import type PostCommentCreateDto from "model/dto/postComment/PostCommentCreateDto";
import type ImageCommentCreateDto from "model/dto/imageComment/ImageCommentCreateDto";
import { getUser } from "redux/commonSlice";

const name = "components/postList";

const postAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.info.id,
  sortComparer: (a, b) => (new Date(a.info.createDate) < new Date(b.info.createDate) ? 1 : -1),
});

const imageAdapter = createEntityAdapter<PostImage>({
  selectId: (image) => image.info.id,
});

const commentAdapter = createEntityAdapter<PostCommentDto>();

const imageCommentAdapter = createEntityAdapter<ImageCommentDto>();

export interface Pagination {
  fromEnd: boolean;
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
  selectedImageIndex: number | null;
  images: EntityState<PostImage>;
  comments: EntityState<PostCommentDto> & {
    pagination: Pagination;
  };
}

export interface PostListState {
  loaded: boolean;
  posts: EntityState<Post> & {
    pagination: Pagination;
  };
}

const initialState: PostListState = {
  loaded: false,
  posts: postAdapter.getInitialState({
    pagination: {
      fromEnd: false,
      currentPage: 1,
      totalPages: 0,
      pageSize: 0,
      totalItems: 0,
      itemsPerPage: 5,
    },
  }),
};

function initPost(info: PostDto) {
  return {
    info,
    selectedImageIndex: null,
    images: imageAdapter.getInitialState(),
    comments: commentAdapter.getInitialState({
      pagination: {
        fromEnd: false,
        currentPage: 1,
        totalPages: 0,
        pageSize: 0,
        totalItems: 0,
        itemsPerPage: 3,
      },
    }),
  };
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    addPost(state, { payload: post }: PayloadAction<PostDto>) {
      postAdapter.addOne(state.posts, initPost(post));
    },
    sharePost(state, { payload: postId }: PayloadAction<string>) {
      const post = state.posts.entities[postId]?.info;
      if (post) {
        post.shared = !post.shared;

        if (post.shared) {
          post.shareCount++;
        } else {
          post.shareCount--;
        }
      }
    },
    shareImage(state, action: PayloadAction<{ postId: string; imageId: string }>) {
      const { postId, imageId } = action.payload;

      const image = state.posts.entities[postId]?.images.entities[imageId]?.info;

      if (image) {
        image.shared = !image.shared;

        if (image.shared) {
          image.shareCount++;
        } else {
          image.shareCount--;
        }
      }
    },
    togglePostLikeStarted(state, { payload: postId }: PayloadAction<string>) {
      const post = state.posts.entities[postId]?.info;
      if (post) {
        post.liked = !post.liked;

        if (post.liked) {
          post.likeCount++;
        } else {
          post.likeCount--;
        }
      }
    },
    toggleImageLikeStarted(state, action: PayloadAction<{ postId: string; imageId: string }>) {
      const { postId, imageId } = action.payload;

      const image = state.posts.entities[postId]?.images.entities[imageId]?.info;

      if (image) {
        image.liked = !image.liked;

        if (image.liked) {
          image.likeCount++;
        } else {
          image.likeCount--;
        }
      }
    },
    setSelectedImage(state, action: PayloadAction<{ postId: string; index: number | null }>) {
      const { postId, index } = action.payload;
      const post = state.posts.entities[postId];
      if (post) {
        post.selectedImageIndex = index;
      }
    },
    fetchPosts(state, action: PayloadAction<string>) {
      state.loaded = false;
    },
    fetchPostsSucceed(state, { payload: response }: PayloadAction<PagedResponse<PostDto>>) {
      state.loaded = true;

      const { posts } = state;
      const { data, ...pagination } = response;

      postAdapter.setAll(posts, data.map(initPost));

      posts.pagination = {
        ...posts.pagination,
        ...pagination,
      };
    },
    fetchPostImagesSucceed(state, action: PayloadAction<{ postId: string; data: PostImageDto[] }>) {
      const { postId, data } = action.payload;
      const images = state.posts.entities[postId]?.images;
      if (images) {
        imageAdapter.setAll(
          images,
          data.map((info) => ({
            info,
            comments: imageCommentAdapter.getInitialState({
              pagination: {
                fromEnd: true,
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

      const comments = state.posts.entities[postId]?.images.entities[imageId]?.comments;

      if (comments) {
        const { data, ...pagination } = response;
        imageCommentAdapter.setAll(comments, data);
        comments.pagination = {
          ...comments.pagination,
          ...pagination,
        };
      }
    },
    fetchMoreImageComments(state, action: PayloadAction<{ postId: string; imageId: string }>) {
      const { postId, imageId } = action.payload;

      // eslint-disable-next-line max-len
      const pagination = state.posts.entities[postId]?.images.entities[imageId]?.comments.pagination;

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
        const { data, ...pagination } = response;
        commentAdapter.setAll(comments, data);
        comments.pagination = {
          ...comments.pagination,
          ...pagination,
        };
      }
    },
    fetchMorePostComments(state, { payload: postId }: PayloadAction<string>) {
      const pagination = state.posts.entities[postId]?.comments.pagination;
      if (pagination) {
        pagination.itemsPerPage += 3;
      }
    },
    createPostCommentSucceed(
      state,
      action: PayloadAction<{
        postId: string;
        response: PagedResponse<PostCommentDto>;
      }>,
    ) {
      const { postId, response } = action.payload;
      const comments = state.posts.entities[postId]?.comments;
      if (comments) {
        const { data, ...pagination } = response;
        commentAdapter.setAll(comments, data);
        comments.pagination = {
          ...comments.pagination,
          ...pagination,
          fromEnd: true,
        };
        if (comments.pagination.itemsPerPage < comments.pagination.totalItems) {
          comments.pagination.itemsPerPage++;
        }
      }
    },
    createImageCommentSucceed(
      state,
      action: PayloadAction<{
        postId: string;
        imageId: string;
        response: PagedResponse<ImageCommentDto>;
      }>,
    ) {
      const { postId, imageId, response } = action.payload;

      const comments = state.posts.entities[postId]?.images.entities[imageId]?.comments;

      if (comments) {
        const { data, ...pagination } = response;
        imageCommentAdapter.setAll(comments, data);
        comments.pagination = {
          ...comments.pagination,
          ...pagination,
        };
        if (comments.pagination.itemsPerPage < comments.pagination.totalItems) {
          comments.pagination.itemsPerPage++;
        }
      }
    },
    deletePostSucceed(state, { payload: postId }: PayloadAction<string>) {
      postAdapter.removeOne(state.posts, postId);
    },
    reset(state) {
      state.loaded = false;
      state.posts = initialState.posts;
    },
  },
});

export const actions = {
  ...slice.actions,

  fetchPostImages: createAction<string>(`${name}/fetchPostImages`),

  fetchPostComments: createAction<string>(`${name}/fetchPostComments`),

  fetchMorePostComments: createAction<string>(`${name}/fetchMorePostComments`),

  fetchImageComments: createAction<{
    postId: string;
    imageId: string;
  }>(`${name}/fetchImageComments`),

  fetchMoreImageComments: createAction<{
    postId: string;
    imageId: string;
  }>(`${name}/fetchMoreImageComments`),

  createPostComment: createAction<{
    postId: string;
    comment: PostCommentCreateDto;
  }>(`${name}/createPostComment`),

  deletePostComment: createAction<{
    postId: string;
    commentId: string;
  }>(`${name}/deletePostComment`),

  createImageComment: createAction<{
    postId: string;
    imageId: string;
    comment: ImageCommentCreateDto;
  }>(`${name}/createImageComment`),

  deleteImageComment: createAction<{
    postId: string;
    imageId: string;
    commentId: string;
  }>(`${name}/deleteImageComment`),

  deletePost: createAction<string>(`${name}/deletePost`),

  togglePostLike: createAction<string>(`${name}/togglePostLike`),

  toggleImageLike: createAction<{ postId: string; imageId: string }>(`${name}/togglePostImageLike`),
};

const getSelf = (state: AppState) => state.postList;

export const getPostsLoading = (state: AppState) => getSelf(state).loaded;

export const getPostIds = (state: AppState) => getSelf(state).posts.ids as string[];

export const getPostsPagination = (state: AppState) => getSelf(state).posts.pagination;

export const getPostById = (state: AppState, postId: string) =>
  getSelf(state).posts.entities[postId]!;

export const getPostInfo = (state: AppState, postId: string) => getPostById(state, postId).info;

export const getSelectedImageIndex = (state: AppState, postId: string) =>
  getPostById(state, postId).selectedImageIndex;

const getPostCommentsState = (state: AppState, postId: string) =>
  getPostById(state, postId).comments;

export const getPostCommentById = (state: AppState, postId: string, commentId: string) =>
  getPostCommentsState(state, postId).entities[commentId]!;

export const getIsCurrentUserComment = (state: AppState, postId: string, commentId: string) =>
  getPostCommentById(state, postId, commentId).authorId === getUser(state).id;

export const getPostCommentIds = (state: AppState, postId: string) =>
  [...getPostCommentsState(state, postId).ids] as string[];

export const getPostCommentsPagination = (state: AppState, postId: string) =>
  getPostCommentsState(state, postId).pagination;

const getImagesState = (state: AppState, postId: string) => getPostById(state, postId).images;

export const getImageById = (state: AppState, postId: string, imageId: string) =>
  getImagesState(state, postId).entities[imageId]!;

export const getImages = (state: AppState, postId: string) =>
  Object.values(getImagesState(state, postId).entities).map((x) => x!.info);

export const getImageInfo = (state: AppState, postId: string, imageId: string) =>
  getImageById(state, postId, imageId).info;

const getImageCommentsState = (state: AppState, postId: string, imageId: string) =>
  getImageById(state, postId, imageId).comments;

export const getImageCommentById = (
  state: AppState,
  postId: string,
  imageId: string,
  commentId: string,
) => getImageCommentsState(state, postId, imageId).entities[commentId]!;

export const getIsCurrentUserImageComment = (
  state: AppState,
  postId: string,
  imageId: string,
  commentId: string,
) => getImageCommentById(state, postId, imageId, commentId).authorId === getUser(state).id;

export const getImageCommentIds = (state: AppState, postId: string, imageId: string) =>
  [...getImageCommentsState(state, postId, imageId).ids] as string[];

export const getImageCommentsPagination = (state: AppState, postId: string, imageId: string) =>
  getImageCommentsState(state, postId, imageId).pagination;

export const getImageCommentsCount = (state: AppState, postId: string, imageId: string) =>
  getImageCommentsState(state, postId, imageId).ids.length;

export const getIsCurrentUserPost = (state: AppState, postId: string) =>
  getPostInfo(state, postId).authorId === getUser(state).id;

export const getLoaded = (state: AppState) => getSelf(state).loaded;

export default slice.reducer;
