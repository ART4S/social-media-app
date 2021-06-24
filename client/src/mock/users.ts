import faker from "faker";
import type IUser from "model/User";

const users: IUser[] = Array.from(Array(10)).map((x) => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatarUrl: faker.internet.avatar(),
}));

export default users;
