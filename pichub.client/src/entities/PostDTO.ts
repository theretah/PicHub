export interface PostDTO {
  id: number;
  photoContent: string;
  caption: string | null;
  commentsAllowed: boolean;
  createDate: Date;
  authorId: string;
}
