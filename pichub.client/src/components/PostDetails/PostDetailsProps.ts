import { User } from "../../auth/store";
import { Post } from "../../entities/Post";

export interface PostDetailsProps {
  post: Post;

  author: User;
  isFollowing: boolean;

  isSaved: boolean;
  handleSaveButton: () => void;

  isLiked: boolean;
  handleLikeButton: () => void;
}
