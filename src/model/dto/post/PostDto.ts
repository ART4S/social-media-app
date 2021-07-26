export default interface PostDto {
  id: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorAvatarUrl?: string;
  createDate: string;
  body: string;
  liked: boolean;
  likeCount: number;
  shared: boolean;
  shareCount: number;
}
