import faker from "faker";
import type UserDto from "model/UserDto";

const users: UserDto[] = [
  {
    id: "03079c10-1f26-40de-9a14-ef9a59c09138",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: "b16c427f-288e-4219-9ccb-2edec31240bc",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
];

export default users;
