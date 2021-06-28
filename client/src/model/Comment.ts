export default interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  avatarUrl: string;
  createdAt: Date;
  body: string;
}
