export default interface IComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  avatarUrl: string;
  createdAt: Date;
  body: string;
}
