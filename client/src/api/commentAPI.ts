import comments from "mock/comments";
import IComment from "model/Comment";

function getAll(postId: string): Promise<IComment[]> {
  return new Promise<IComment[]>((resolve) =>
    setTimeout(() => {
      resolve(comments.filter((x) => x.postId === postId));
    }, 500),
  );
}

export default { getAll };
