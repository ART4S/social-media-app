import faker from "faker";

import { normalize } from "utils/dataUtils";

import { users } from "./users";
import { posts } from "./posts";

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createDate: string;
}

export const postComments: PostComment[] = [
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[2].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[3].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[4].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[5].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[0].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
];

const entities: { [id: string]: PostComment } = normalize(postComments, (x) => x.id);

export default entities;
