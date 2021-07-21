import { normalize } from "utils/dataUtils";
import { composeKey } from "mock/utils/entityUtils";

import { posts } from "./posts";
import { users } from "./users";

export interface PostLike {
  postId: string;
  userId: string;
}

export const postLikes: PostLike[] = [
  {
    postId: posts[0].id,
    userId: users[1].id,
  },
  {
    postId: posts[0].id,
    userId: users[2].id,
  },
  {
    postId: posts[0].id,
    userId: users[3].id,
  },
  {
    postId: posts[0].id,
    userId: users[4].id,
  },
  {
    postId: posts[0].id,
    userId: users[5].id,
  },
];

const entities: { [compositeKey: string]: PostLike } = normalize(postLikes, (x) =>
  composeKey(x.postId, x.userId),
);

export default entities;
