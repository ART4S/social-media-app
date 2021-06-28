export default interface IImage {
  id: string;
  url: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorAvatarUrl: string;
  createDate: Date;
  liked: boolean;
  likeCount: number;
  shareCount: number;
}
