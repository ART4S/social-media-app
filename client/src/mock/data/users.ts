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

function createUser(id: string): User {
  return {
    id,
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  };
}

const ids = [
  "7782b084-5c63-48ca-9acb-046680ac20b5",
  "43feb76c-e6c1-4122-9e40-ca58d6625969",
  "d7fb53d4-a209-4375-9606-1a454f42afcc",
  "39d7b906-ff67-4687-aec7-da1991741992",
  "ceecb37b-dbee-4694-9bb7-dfdb02fb5c91",
  "2680bd41-d69f-48dd-9105-bb7ad7e72441",
  "79bb4631-3bd8-4f88-a5c1-8e6a2bb492c2",
  "60d6dae7-e7c4-46b5-bbfd-282e6863377e",
  "5a9912a1-e4bd-4337-ade9-ea88d1f71e33",
];

export const users: User[] = [
  {
    ...createUser("34421e5e-d2c0-419c-adfa-735cee28a660"),
    email: "admin",
    password: "admin",
  },
  ...ids.map(createUser),
];

const entities: { [id: string]: User } = normalize(users, (x) => x.id);

export default entities;
