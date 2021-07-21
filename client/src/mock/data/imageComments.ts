import faker from "faker";

import { normalize } from "utils/dataUtils";

import { users } from "./users";
import { postImages } from "./postImages";

export interface ImageComment {
  id: string;
  imageId: string;
  authorId: string;
  text: string;
  createDate: string;
}

export const imageComments: ImageComment[] = [
  {
    id: faker.datatype.uuid(),
    imageId: postImages[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    imageId: postImages[0].id,
    authorId: users[2].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    imageId: postImages[0].id,
    authorId: users[3].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
  {
    id: faker.datatype.uuid(),
    imageId: postImages[0].id,
    authorId: users[4].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent().toString(),
  },
];

const entities: { [id: string]: ImageComment } = normalize(imageComments, (x) => x.id);

export default entities;
