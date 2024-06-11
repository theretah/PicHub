import { User } from "../auth/store";

export interface Post {
  id: number;
  caption: string;
  commentsAllowed: boolean;
  createDate: Date;
  authorId: string;
  author: User;
  photoContent: string;
}
