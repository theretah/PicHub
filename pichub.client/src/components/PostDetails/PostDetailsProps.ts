import { User } from "../../auth/store";
import { Post } from "../../interfaces/Post";

export interface PostDetailsProps {
  author: User;
  post: Post;
  isFollowing: boolean;
  likesCount: number;

  isSaved: boolean;
  handleSaveButton: () => void;
  isLiked: boolean;
  handleLikeButton: () => void;
}
