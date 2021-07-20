export default interface UserProfileDto {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatarUrl?: string;
  email: string;
  status?: string;
  about?: string;
  isCurrentUserFollow: boolean;
}
