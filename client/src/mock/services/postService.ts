import posts from "mock/data/posts";
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

import { toPagedResponse } from "../utils/paginationUtils";
import { ImageCommentDto } from "model/dto/ImageCommentDto";

function getAll(
  authorId: string,
  pagination: PagedRequest,
): PagedResponse<PostDto> {
  const data: PostDto[] = Object.values(posts)
    .filter((x) => x.authorId === authorId)
    .map((x) => ({
      id: x.id,
      authorId: x.authorId,
      authorFirstName: users[x.authorId].firstName,
      authorLastName: users[x.authorId].lastName,
      authorAvatarUrl: users[x.authorId].avatarUrl,
      body: x.body,
      createDate: x.createDate,
      liked: !!postLikes[`${x.id}-${authorId}`],
      likeCount: Object.values(postLikes).filter((l) => l.postId == x.id)
        .length,
    }));

  return toPagedResponse(data, pagination);
}

function getImages(postId: string): PostImageDto[] {
  return Object.values(postImages)
    .filter((x) => x.postId === postId)
    .map((x) => ({
      id: x.id,
      postId: x.postId,
      url: x.url,
      createDate: x.createDate,
      liked: !!postImageLikes[`${x.id}-${posts[x.postId].authorId}`],
      likeCount: Object.values(postImageLikes).filter((l) => l.imageId === x.id)
        .length,
    }));
}

function getComments(
  postId: string,
  pagination: PagedRequest,
): PagedResponse<PostCommentDto> {
  const data: PostCommentDto[] = Object.values(postComments)
    .filter((x) => x.postId === postId)
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

function getImageComments(
  postId: string,
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
    }))
    .reverse();

  return toPagedResponse(data, pagination);
}

export default { getAll, getImages, getComments, getImageComments };
