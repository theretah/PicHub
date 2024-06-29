export interface User {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  bio: string;
  gender: string;
  profileImageUrl: string;
  followersCount: number;
  followingsCount: number;
  registrationDate: Date;
}
