import { UserDTO } from "./UserDTO";

export interface PostDTO {
  id: number;
  caption: string;
  commentsAllowed: boolean;
  createDate: Date;
  authorId: string;
  author: UserDTO;
  photoContent: string;
}
