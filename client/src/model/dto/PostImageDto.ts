export default interface PostImageDto {
  id: string;
  postId: string;
  url: string;
  createDate: string;
  liked: boolean;
  likeCount: number;
}
