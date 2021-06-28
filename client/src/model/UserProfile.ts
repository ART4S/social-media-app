export default interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  email?: string;
  status?: string;
  joined: Date;
  about?: string;
}
