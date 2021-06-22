export default interface IPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string;
  createdAt: Date;
  body: string;
  likeCount: number;
  commentCount: number;
}
