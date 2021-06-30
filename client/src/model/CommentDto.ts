export default interface CommentDto {
  id: string;
  postId: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  avatarUrl: string;
  createdAt: Date;
  body: string;
}
