export default interface Post {
  id: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorAvatarUrl?: string;
  createDate: Date;
  body: string;
  liked: boolean;
  likeCount: number;
  commentCount: number;
}
