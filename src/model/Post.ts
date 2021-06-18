export default interface IPost {
  authorId: string;
  authorName: string;
  authorAvatarUrl: string;
  createdAt: Date;
  body: string;
  likeCount: number;
  commentCount: number;
}
