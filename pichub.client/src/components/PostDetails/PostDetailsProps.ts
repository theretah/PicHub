import { Post } from "../../entities/Post";
import { User } from "../../entities/User";

export interface PostDetailsProps {
  post: Post;

  author: User;
  isFollowing: boolean;

  isSaved: boolean;
  handleSaveButton: () => void;

  isLiked: boolean;
  handleLikeButton: () => void;
}
