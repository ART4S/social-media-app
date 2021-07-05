export default interface PostCommentDto {
  id: string;
  postId: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  avatarUrl?: string;
  text: string;
  createDate: string;
}
