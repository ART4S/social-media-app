import faker from "faker";

import type IComment from "model/Comment";
import posts from "./posts";

const comments: IComment[] = Array.from(Array(4)).map(() => ({
  id: faker.datatype.uuid(),
  postId: faker.random.arrayElement(posts).id,
  authorId: faker.datatype.uuid(),
  authorName: faker.name.firstName() + " " + faker.name.lastName(),
  avatarUrl: faker.internet.avatar(),
  createdAt: faker.date.recent(),
  body: faker.lorem.sentence(),
}));

export default comments;
