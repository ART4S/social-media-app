import { normalize } from "utils/dataUtils";
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

const entities: { [postIduserId: string]: PostLike } = normalize(
  postLikes,
  (x) => `${x.postId}-${x.userId}`,
);

export default entities;
