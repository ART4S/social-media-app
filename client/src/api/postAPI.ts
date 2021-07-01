import posts from "mock/posts";
import PostDto from "model/PostDto";
import ImageDto from "model/ImageDto";

function getAll(): Promise<PostDto[]> {
  return new Promise<PostDto[]>((resolve) =>
    setTimeout(() => {
      resolve(posts);
    }, 500),
  );
}

function getImages(id: number): Promise<ImageDto> {
  return new Promise<ImageDto[]>((resolve) =>
    setTimeout(() => {
      resolve(posts);
    }, 500),
  );
}

export default { getAll };
