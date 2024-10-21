export interface User {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  bio: string | null;
  profileImageUrl: string | null;
  registrationDate: Date;
  genderId: string;
  professionalCategoryId: string | null;
  accountCategoryId: string;
}
