import { normalize } from "utils/dataUtils";
import { composeKey } from "mock/utils/entityUtils";

import { users } from "./users";

export interface Following {
  userId: string;
  followerId: string;
}

export const followings: Following[] = [
  {
    userId: users[0].id,
    followerId: users[1].id,
  },
  {
    userId: users[0].id,
    followerId: users[2].id,
  },
  {
    userId: users[0].id,
    followerId: users[3].id,
  },
  {
    userId: users[0].id,
    followerId: users[4].id,
  },
  {
    userId: users[0].id,
    followerId: users[5].id,
  },
  {
    userId: users[5].id,
    followerId: users[0].id,
  },
  {
    userId: users[4].id,
    followerId: users[0].id,
  },
  {
    userId: users[3].id,
    followerId: users[0].id,
  },
  {
    userId: users[2].id,
    followerId: users[0].id,
  },
];

const entities: { [compositeKey: string]: Following } = normalize(followings, (x) =>
  composeKey(x.userId, x.followerId),
);

export default entities;
