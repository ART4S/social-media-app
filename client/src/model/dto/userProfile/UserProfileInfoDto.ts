export default interface UserProfileInfoDto {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatarUrl?: string;
  about?: string;
}
