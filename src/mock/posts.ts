import type IPost from "model/Post";
import faker from "faker";

const posts: IPost[] = Array.from(Array(4)).map(() => ({
  id: faker.datatype.uuid(),
  authorId: faker.datatype.uuid(),
  authorName: faker.name.firstName() + " " + faker.name.lastName(),
  authorAvatarUrl: faker.internet.avatar(),
  body: faker.lorem.paragraphs(),
  createdAt: faker.date.recent(),
  commentCount: 0,
  likeCount: 0,
}));

export default posts;
