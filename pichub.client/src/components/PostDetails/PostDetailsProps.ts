import { PostDTO } from "../../entities/PostDTO";
import { UserDTO } from "../../entities/UserDTO";

export interface PostDetailsProps {
  post: PostDTO;

  author: UserDTO;
  isFollowing: boolean;

  isSaved: boolean;
  handleSaveButton: () => void;

  isLiked: boolean;
  handleLikeButton: () => void;

  likesCount: number;

  handleFollowButton: () => void;
}
