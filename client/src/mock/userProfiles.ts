import faker from "faker";
import type IUserProfile from "model/UserProfile";

const about = [faker.lorem.text(), faker.lorem.words(), ""];

const profiles: IUserProfile[] = Array.from(Array(10)).map((x) => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatarUrl: faker.internet.avatar(),
  email: faker.internet.email(),
  status: faker.lorem.words(),
  dateOfBirth: faker.date.past(),
  about: faker.lorem.paragraph(),
}));

export default profiles;
