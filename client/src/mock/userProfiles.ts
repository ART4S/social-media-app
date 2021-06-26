import faker from "faker";
import type IUserProfile from "model/UserProfile";

const profiles: IUserProfile[] = Array.from(Array(10)).map((x) => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatarUrl: faker.internet.avatar(),
  email: faker.internet.email(),
  status: faker.lorem.words(),
  joined: faker.date.past(),
}));

export default profiles;
