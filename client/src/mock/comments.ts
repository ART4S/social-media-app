import faker from "faker";

import type IComment from "model/Comment";
import posts from "./posts";

const comments: IComment[] = Array.from(Array(10)).map(() => ({
  id: faker.datatype.uuid(),
  postId: faker.random.arrayElement(posts).id,
  authorId: faker.datatype.uuid(),
  authorFirstName: faker.name.firstName(),
  authorLastName: faker.name.lastName(),
  avatarUrl: faker.internet.avatar(),
  createdAt: faker.date.recent(),
  body: faker.lorem.sentence(),
}));

export default comments;
