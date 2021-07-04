import faker from "faker";
import { normalize } from "utils/dataUtils";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export const users: User[] = [
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
];

const entities: { [id: string]: User } = normalize(users, (x) => x.id);

export default entities;
