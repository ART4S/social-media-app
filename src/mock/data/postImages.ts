import faker from "faker";

import { normalize } from "utils/dataUtils";

import { posts } from "./posts";

export interface PostImage {
  id: string;
  postId: string;
  url: string;
  createDate: string;
}

export const postImages: PostImage[] = [
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent().toString(),
  },
];

const entities: { [id: string]: PostImage } = normalize(postImages, (x) => x.id);

export default entities;
