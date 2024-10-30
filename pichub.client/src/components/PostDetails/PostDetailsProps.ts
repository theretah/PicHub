import { Post } from "../../entities/PostDTO";
import { User } from "../../entities/UserDTO";

export interface PostDetailsProps {
  post: Post;

  author: User;
  isFollowing: boolean;

  isSaved: boolean;
  handleSaveButton: () => void;

  isLiked: boolean;
  handleLikeButton: () => void;

  likesCount: number;

  handleFollowButton: () => void;
}
