import faker from "faker";
import IPost from "model/Post";

function getAll() {
  return new Promise<IPost[]>((resolve) =>
    setTimeout(() => {
      resolve(
        Array.from(Array(4)).map(() => ({
          authorId: faker.datatype.uuid(),
          authorName: faker.name.firstName() + " " + faker.name.lastName(),
          authorAvatarUrl: faker.internet.avatar(),
          body: faker.lorem.text(),
          createdAt: faker.date.recent(),
          commentCount: 0,
          likeCount: 0,
        }))
      );
    }, 500)
  );
}

export default { getAll };
