import faker from "faker";

import posts, { Post } from "mock/data/posts";
import users from "mock/data/users";
import postLikes from "mock/data/postLikes";
import postImageLikes from "mock/data/postImageLikes";
import postImages from "mock/data/postImages";
import postComments from "mock/data/postComments";
import imageComments from "mock/data/imageComments";
import type PostDto from "model/dto/PostDto";
import type PostImageDto from "model/dto/PostImageDto";
import type PostCommentDto from "model/dto/PostCommentDto";
import type PagedRequest from "model/pagination/PagedRequest";
import type PagedResponse from "model/pagination/PagedResponse";
import type PostCommentCreateDto from "model/dto/posts/PostCommentCreateDto";

import { composeKey } from "mock/utils/entityUtils";

import { toPagedResponse } from "../utils/paginationUtils";
import { ImageCommentDto } from "model/dto/ImageCommentDto";
import ImageCommentCreateDto from "model/dto/posts/ImageCommentCreateDto";
import PostCreateDto from "model/dto/posts/PostCreateDto";
import { currentUser } from "mock/services/authService";

function mapPost(post: Post) {
  return {
    id: post.id,
    authorId: post.authorId,
    authorFirstName: users[post.authorId].firstName,
    authorLastName: users[post.authorId].lastName,
    authorAvatarUrl: users[post.authorId].avatarUrl,
    body: post.body,
    createDate: post.createDate,
    liked: !!postLikes[composeKey(post.id, currentUser!.id)],
    likeCount: Object.values(postLikes).filter((l) => l.postId == post.id)
      .length,
    shareCount: 0,
    shared: false,
  };
}

// posts
function getAll(
  authorId: string,
  pagination: PagedRequest,
): PagedResponse<PostDto> {
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
    .map((x) => ({
      id: x.id,
      postId: x.postId,
      url: x.url,
      createDate: x.createDate,
      liked: !!postImageLikes[composeKey(x.id, posts[x.postId].authorId)],
      likeCount: Object.values(postImageLikes).filter((l) => l.imageId === x.id)
        .length,
      shared: false,
      shareCount: 0,
    }));
}

// posts/:id/comments
function getComments(
  id: string,
  pagination: PagedRequest,
): PagedResponse<PostCommentDto> {
  const data: PostCommentDto[] = Object.values(postComments)
    .filter((x) => x.postId === id)
    .sort((a, b) => (new Date(a.createDate) > new Date(b.createDate) ? 1 : -1))
    .map((x) => ({
      id: x.id,
      postId: x.postId,
      authorId: x.authorId,
      authorFirstName: users[x.authorId].firstName,
      authorLastName: users[x.authorId].lastName,
      avatarUrl: users[x.authorId].avatarUrl,
      text: x.text,
      createDate: x.createDate,
    }));

  return toPagedResponse(data, pagination);
}

// posts
function createPost(post: PostCreateDto) {
  const postId = faker.datatype.uuid();

  posts[postId] = {
    id: postId,
    authorId: currentUser!.id,
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

  postComments[id] = {
    ...comment,
    id: commentId,
    postId: id,
    authorId: currentUser!.id,
    createDate: new Date().toISOString(),
  };

  return id;
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
    .map((x) => ({
      id: x.id,
      imageId: x.imageId,
      authorId: x.authorId,
      authorFirstName: users[x.authorId].firstName,
      authorLastName: users[x.authorId].lastName,
      avatarUrl: users[x.authorId].avatarUrl,
      text: x.text,
      createDate: x.createDate,
    }));

  return toPagedResponse(data, pagination);
}

// posts/:id/like
function addLike(id: string) {
  const userId = currentUser!.id;
  postLikes[composeKey(id, userId)] = { postId: id, userId };
}

// posts/:id/like
function removeLike(id: string) {
  const userId = currentUser!.id;
  delete postLikes[composeKey(id, userId)];
}

// posts/images/:imageId
function addImageLike(imageId: string) {
  const userId = currentUser!.id;
  postImageLikes[composeKey(imageId, userId)] = { imageId, userId };
}

// posts/images/:imageId
function removeImageLike(imageId: string) {
  const userId = currentUser!.id;
  delete postImageLikes[composeKey(imageId, userId)];
}

// posts/images/:imageId/comments
function createImageComment(
  imageId: string,
  comment: ImageCommentCreateDto,
): string {
  const id = faker.datatype.uuid();

  imageComments[id] = {
    ...comment,
    id,
    imageId,
    authorId: currentUser!.id,
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
