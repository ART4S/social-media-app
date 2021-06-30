import type IPost from "model/PostDto";
import faker from "faker";

const posts: IPost[] = Array.from(Array(4)).map(() => ({
  id: faker.datatype.uuid(),
  authorId: faker.datatype.uuid(),
  authorFirstName: faker.name.firstName(),
  authorLastName: faker.name.lastName(),
  authorAvatarUrl: faker.internet.avatar(),
  body: faker.lorem.paragraphs(),
  createDate: faker.date.recent(),
  liked: faker.datatype.boolean(),
  commentCount: 0,
  likeCount: 0,
}));

export default posts;
