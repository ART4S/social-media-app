import postService from "mock/services/postService";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import type PostCommentDto from "model/dto/PostCommentDto";
import type PostDto from "model/dto/PostDto";
import type PostImageDto from "model/dto/PostImageDto";
import ImageCommentCreateDto from "model/dto/posts/ImageCommentCreateDto";
import PostCommentCreateDto from "model/dto/posts/PostCommentCreateDto";
import PostCreateDto from "model/dto/posts/PostCreateDto";
import type PagedRequest from "model/pagination/PagedRequest";
import type PagedResponse from "model/pagination/PagedResponse";

import config from "./config";

function getAll(
  authorId: string,
  pagination: PagedRequest,
): Promise<PagedResponse<PostDto>> {
  return new Promise<PagedResponse<PostDto>>((resolve) =>
    setTimeout(
      () => resolve(postService.getAll(authorId, pagination)),
      config.delayMs,
    ),
  );
}

function getImages(postId: string): Promise<PostImageDto[]> {
  return new Promise<PostImageDto[]>((resolve) =>
    setTimeout(() => resolve(postService.getImages(postId)), config.delayMs),
  );
}

function getComments(
  postId: string,
  pagination: PagedRequest,
): Promise<PagedResponse<PostCommentDto>> {
  return new Promise<PagedResponse<PostCommentDto>>((resolve) =>
    setTimeout(
      () => resolve(postService.getComments(postId, pagination)),
      config.delayMs,
    ),
  );
}

function getImageComments(
  imageId: string,
  pagination: PagedRequest,
): Promise<PagedResponse<ImageCommentDto>> {
  return new Promise<PagedResponse<ImageCommentDto>>((resolve) =>
    setTimeout(
      () => resolve(postService.getImageComments(imageId, pagination)),
      config.delayMs,
    ),
  );
}

function addLike(postId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      postService.addLike(postId);
      resolve();
    }, config.delayMs),
  );
}

function removeLike(postId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      postService.removeLike(postId);
      resolve();
    }, config.delayMs),
  );
}

function createComment(
  postId: string,
  comment: PostCommentCreateDto,
): Promise<string> {
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve(postService.createComment(postId, comment));
    }, config.delayMs),
  );
}

function deleteComment(commentId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      postService.deleteComment(commentId);
      resolve();
    }, config.delayMs),
  );
}

function addImageLike(imageId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      postService.addImageLike(imageId);
      resolve();
    }, config.delayMs),
  );
}

function removeImageLike(imageId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      postService.removeImageLike(imageId);
      resolve();
    }, config.delayMs),
  );
}

function createImageComment(
  imageId: string,
  comment: ImageCommentCreateDto,
): Promise<string> {
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve(postService.createImageComment(imageId, comment));
    }, config.delayMs),
  );
}

function deleteImageComment(commentId: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      postService.deleteImageComment(commentId);
      resolve();
    }, config.delayMs);
  });
}

function deletePost(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      postService.deletePost(id);
      resolve();
    }, config.delayMs);
  });
}

function createPost(post: PostCreateDto): Promise<string> {
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve(postService.createPost(post));
    }, config.delayMs),
  );
}

function getById(id: string): Promise<PostDto> {
  return new Promise<PostDto>((resolve) =>
    setTimeout(() => {
      resolve(postService.getById(id));
    }, config.delayMs),
  );
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
