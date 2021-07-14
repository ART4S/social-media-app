import faker from "faker";
import { normalize } from "utils/dataUtils";

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

function createUser() {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  };
}

export const users: User[] = [
  {
    ...createUser(),
    email: "admin",
    password: "admin",
  },
  createUser(),
  createUser(),
  createUser(),
  createUser(),
  createUser(),
];

const entities: { [id: string]: User } = normalize(users, (x) => x.id);

export default entities;
