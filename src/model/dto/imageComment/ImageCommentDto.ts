export default interface ImageCommentDto {
  id: string;
  imageId: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  avatarUrl?: string;
  text: string;
  createDate: string;
}
