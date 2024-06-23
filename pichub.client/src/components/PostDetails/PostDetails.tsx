import { useEffect, useState } from "react";
import useUserById from "../../hooks/accountHooks/useUserById";
import useIsLiked from "../../hooks/postHooks/useIsLiked";
import useIsSaved from "../../hooks/postHooks/useIsSaved";
import useIsFollowing from "../../hooks/userHooks/useIsFollowing";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
import { Post } from "../../interfaces/Post";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { User } from "../../auth/store";
import axios from "axios";

interface Props {
  post: Post;
  onlyVertical: boolean;
}
interface Like {
  postId: number;
  userId: string;
}
const PostDetails = ({ post, onlyVertical }: Props) => {
  const { data: author } = useUserById({
    userId: post.authorId,
  });
  const { data: isFollowing } = useIsFollowing({
    followingId: post.authorId,
  });

  const { data: isLiked } = useIsLiked({ postId: post.id });
  const { data: isSaved } = useIsSaved({ postId: post.id });

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 920);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function handleLikeButton() {}

  async function handleSaveButton() {}

  if (
    author == undefined ||
    isLiked == undefined ||
    isSaved == undefined ||
    isFollowing == undefined
  )
    return <LoadingIndicator />;

  return (
    <div className="row mx-auto">
      {isSmallScreen || onlyVertical ? (
        <PostDetailsVertical
          author={author}
          post={post}
          isFollowing={isFollowing}
          isSaved={isSaved}
          handleSaveButton={handleSaveButton}
          isLiked={isLiked}
          handleLikeButton={handleLikeButton}
        />
      ) : (
        <PostDetailsHorizontal
          author={author}
          post={post}
          isFollowing={isFollowing}
          isSaved={isSaved}
          handleSaveButton={handleSaveButton}
          isLiked={isLiked}
          handleLikeButton={handleLikeButton}
        />
      )}
    </div>
  );
};

export default PostDetails;
