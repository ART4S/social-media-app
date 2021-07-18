export default interface UserProfileInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatarUrl?: string;
  about?: string;
}
