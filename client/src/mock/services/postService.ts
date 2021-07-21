import faker from "faker";

import posts, { Post } from "mock/data/posts";
import users from "mock/data/users";
import postLikes from "mock/data/postLikes";
import postImageLikes from "mock/data/postImageLikes";
import postImages, { PostImage } from "mock/data/postImages";
import postComments, { PostComment } from "mock/data/postComments";
import imageComments, { ImageComment } from "mock/data/imageComments";
import type PostDto from "model/dto/post/PostDto";
import type PostImageDto from "model/dto/postImage/PostImageDto";
import type PostCommentDto from "model/dto/postComment/PostCommentDto";
import type PagedRequest from "model/pagination/PagedRequest";
import type PagedResponse from "model/pagination/PagedResponse";
import type PostCommentCreateDto from "model/dto/postComment/PostCommentCreateDto";
import { composeKey } from "mock/utils/entityUtils";
import type ImageCommentDto from "model/dto/imageComment/ImageCommentDto";
import type ImageCommentCreateDto from "model/dto/imageComment/ImageCommentCreateDto";
import type PostCreateDto from "model/dto/post/PostCreateDto";
import { getCurrentUser } from "mock/services/authService";

import { toPagedResponse } from "../utils/paginationUtils";

// posts
function getAll(authorId: string, pagination: PagedRequest): PagedResponse<PostDto> {
  const data: PostDto[] = Object.values(posts)
    .filter((x) => x.authorId === authorId)
    .sort((a, b) => (new Date(a.createDate) < new Date(b.createDate) ? 1 : -1))
    .map(mapPost);

  return toPagedResponse(data, pagination);
}

// posts/:id
function getById(id: string) {
  return mapPost(posts[id]);
}

// posts/:id/images
function getImages(id: string): PostImageDto[] {
  return Object.values(postImages)
    .filter((x) => x.postId === id)
    .map(mapImage);
}

// posts/:id/comments
function getComments(id: string, pagination: PagedRequest): PagedResponse<PostCommentDto> {
  const data: PostCommentDto[] = Object.values(postComments)
    .filter((x) => x.postId === id)
    .sort((a, b) => (new Date(a.createDate) > new Date(b.createDate) ? 1 : -1))
    .map(mapPostComment);

  return toPagedResponse(data, pagination);
}

// posts
function createPost(post: PostCreateDto) {
  const postId = faker.datatype.uuid();

  posts[postId] = {
    id: postId,
    authorId: getCurrentUser().id,
    body: post.body,
    createDate: new Date().toISOString(),
  };

  post.images.forEach((url) => {
    const imageId = faker.datatype.uuid();
    postImages[imageId] = {
      id: imageId,
      postId,
      url,
      createDate: new Date().toISOString(),
    };
  });

  return postId;
}

// posts/:id/comments
function createComment(id: string, comment: PostCommentCreateDto): string {
  const commentId = faker.datatype.uuid();

  postComments[commentId] = {
    ...comment,
    id: commentId,
    postId: id,
    authorId: getCurrentUser().id,
    createDate: new Date().toISOString(),
  };

  return commentId;
}

// posts/comments/:commentId
function deleteComment(commentId: string) {
  delete postComments[commentId];
}

// posts/images/:imageId/comments
function getImageComments(
  imageId: string,
  pagination: PagedRequest,
): PagedResponse<ImageCommentDto> {
  const data: ImageCommentDto[] = Object.values(imageComments)
    .filter((x) => x.imageId === imageId)
    .sort((a, b) => (new Date(a.createDate) > new Date(b.createDate) ? 1 : -1))
    .map(mapImageComment);

  return toPagedResponse(data, pagination);
}

// posts/:id/like
function addLike(id: string) {
  const userId = getCurrentUser().id;
  postLikes[composeKey(id, userId)] = { postId: id, userId };
}

// posts/:id/like
function removeLike(id: string) {
  const userId = getCurrentUser().id;
  delete postLikes[composeKey(id, userId)];
}

// posts/images/:imageId
function addImageLike(imageId: string) {
  const userId = getCurrentUser().id;
  postImageLikes[composeKey(imageId, userId)] = { imageId, userId };
}

// posts/images/:imageId
function removeImageLike(imageId: string) {
  const userId = getCurrentUser().id;
  delete postImageLikes[composeKey(imageId, userId)];
}

// posts/images/:imageId/comments
function createImageComment(imageId: string, comment: ImageCommentCreateDto): string {
  const id = faker.datatype.uuid();

  imageComments[id] = {
    ...comment,
    id,
    imageId,
    authorId: getCurrentUser().id,
    createDate: new Date().toISOString(),
  };

  return id;
}

// posts/images/comments/:commentId
function deleteImageComment(commentId: string) {
  delete imageComments[commentId];
}

// posts/:id
function deletePost(id: string) {
  delete posts[id]; // TODO: clear related entities
}

export default {
  getAll,
  getById,
  getImages,
  getComments,
  getImageComments,
  createPost,
  createComment,
  createImageComment,
  deletePost,
  deleteComment,
  deleteImageComment,
  addLike,
  removeLike,
  addImageLike,
  removeImageLike,
};

function mapPost(post: Post): PostDto {
  return {
    id: post.id,
    authorId: post.authorId,
    authorFirstName: users[post.authorId].firstName,
    authorLastName: users[post.authorId].lastName,
    authorAvatarUrl: users[post.authorId].avatarUrl,
    body: post.body,
    createDate: post.createDate,
    liked: !!postLikes[composeKey(post.id, getCurrentUser().id)],
    likeCount: Object.values(postLikes).filter((l) => l.postId === post.id).length,
    shareCount: 0,
    shared: false,
  };
}

function mapPostComment(comment: PostComment): PostCommentDto {
  return {
    id: comment.id,
    postId: comment.postId,
    authorId: comment.authorId,
    authorFirstName: users[comment.authorId].firstName,
    authorLastName: users[comment.authorId].lastName,
    avatarUrl: users[comment.authorId].avatarUrl,
    text: comment.text,
    createDate: comment.createDate,
  };
}

function mapImageComment(comment: ImageComment): ImageCommentDto {
  return {
    id: comment.id,
    imageId: comment.imageId,
    authorId: comment.authorId,
    authorFirstName: users[comment.authorId].firstName,
    authorLastName: users[comment.authorId].lastName,
    avatarUrl: users[comment.authorId].avatarUrl,
    text: comment.text,
    createDate: comment.createDate,
  };
}

function mapImage(image: PostImage): PostImageDto {
  return {
    id: image.id,
    postId: image.postId,
    url: image.url,
    createDate: image.createDate,
    liked: !!postImageLikes[composeKey(image.id, posts[image.postId].authorId)],
    likeCount: Object.values(postImageLikes).filter((l) => l.imageId === image.id).length,
    shared: false,
    shareCount: 0,
  };
}
