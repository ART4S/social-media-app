export default interface IPost {
  id: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorAvatarUrl: string;
  createdAt: Date;
  body: string;
  liked: boolean;
  likeCount: number;
  commentCount: number;
}
