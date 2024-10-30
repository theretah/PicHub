export interface EditProfileDTO {
  FullName: string | null;
  UserName: string;
  Bio: string | null;
  ProfileImageFile: File | string | null;
  Gender: number;
}
