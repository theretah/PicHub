export interface RegisterDTO {
  email: string;
  userName: string;
  password: string;
  fullName: string | null;
  accountCategoryId: number | 1;
  professionalCategoryId: number | null;
  genderId: number | 1;
}
