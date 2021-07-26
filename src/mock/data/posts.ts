import faker from "faker";

import { normalize } from "utils/dataUtils";

import { users } from "./users";

export interface Post {
  id: string;
  authorId: string;
  body: string;
  createDate: string;
}

export const posts: Post[] = [
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    body: faker.lorem.paragraphs(),
    createDate: faker.date.recent().toString(),
  },
];

const entities: { [id: string]: Post } = normalize(posts, (x) => x.id);

export default entities;
