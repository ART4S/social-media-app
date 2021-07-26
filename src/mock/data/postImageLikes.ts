import { normalize } from "utils/dataUtils";
import { composeKey } from "mock/utils/entityUtils";

import { postImages } from "./postImages";
import { users } from "./users";

export interface PostImageLikes {
  imageId: string;
  userId: string;
}

export const postImageLikes: PostImageLikes[] = [
  {
    imageId: postImages[0].id,
    userId: users[1].id,
  },
  {
    imageId: postImages[0].id,
    userId: users[2].id,
  },
  {
    imageId: postImages[0].id,
    userId: users[3].id,
  },
  {
    imageId: postImages[0].id,
    userId: users[4].id,
  },
  {
    imageId: postImages[0].id,
    userId: users[5].id,
  },
];

const entities: { [compositeKey: string]: PostImageLikes } = normalize(postImageLikes, (x) =>
  composeKey(x.imageId, x.userId),
);

export default entities;
