export interface UserDTO {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  bio: string | null;
  profileImageUrl: string | null;
  registrationDate: Date;
  genderId: string;
  accountCategoryId: string;
  professionalCategoryId: string | null;
}
