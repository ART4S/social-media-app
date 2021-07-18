export default interface UserProfileEditDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatarUrl?: string;
  about?: string;
}
