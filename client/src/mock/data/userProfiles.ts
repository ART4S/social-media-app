import faker from "faker";

import { normalize } from "utils/dataUtils";
import { users } from "mock/data/users";

export interface UserProfile {
  id: string;
  userId: string;
  dateOfBirth: string;
  status?: string;
  about?: string;
}

function createProfile(userId: string): UserProfile {
  return {
    id: faker.datatype.uuid(),
    userId,
    dateOfBirth: faker.date.past().toISOString(),
    status: faker.lorem.paragraph(),
    about: faker.lorem.paragraphs(),
  };
}

export const userProfiles: UserProfile[] = users.map(({ id }) => createProfile(id));

export const userProfilesById: { [id: string]: UserProfile } = normalize(userProfiles, (x) => x.id);

export const userProfilesByUserId: { [userId: string]: UserProfile } = normalize(
  userProfiles,
  (x) => x.userId,
);
