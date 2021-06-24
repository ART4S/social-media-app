export default interface IPost {
  id: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorAvatarUrl: string;
  createdAt: Date;
  body: string;
  likeCount: number;
  commentCount: number;
}
