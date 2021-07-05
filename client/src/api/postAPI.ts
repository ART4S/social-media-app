import postService from "mock/services/postService";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import type PostCommentDto from "model/dto/PostCommentDto";
import type PostDto from "model/dto/PostDto";
import type PostImageDto from "model/dto/PostImageDto";
import PostCommentCreateDto from "model/dto/posts/PostCommentCreateDto";
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

function addLike(postId: string, userId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      postService.addLike(postId, userId);
      resolve();
    }, config.delayMs),
  );
}

function removeLike(postId: string, userId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      postService.removeLike(postId, userId);
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

export default {
  getAll,
  getImages,
  getComments,
  getImageComments,
  addLike,
  removeLike,
  createComment,
  deleteComment,
};
