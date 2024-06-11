import { User } from "../../auth/store";
import { Post } from "../../interfaces/Post";

export interface PostDetailsProps {
  author: User;
  post: Post;
  handleLikeButton: () => void;
  handleSaveButton: () => void;
}
