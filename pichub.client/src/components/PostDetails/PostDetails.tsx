import { useEffect, useState } from "react";
import useUserById from "../../hooks/accountHooks/useUserById";
import useIsLiked from "../../hooks/postHooks/useIsLiked";
import useIsSaved from "../../hooks/postHooks/useIsSaved";
import useLikesCount from "../../hooks/postHooks/useLikesCount";
import useIsFollowing from "../../hooks/userHooks/useIsFollowing";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
import { Post } from "../../interfaces/Post";

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

  const { data: likesCount } = useLikesCount({ postId: post.id });
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
  return (
    <div className="row mx-auto">
      {author &&
        post &&
        likesCount != undefined &&
        isLiked != undefined &&
        isSaved != undefined &&
        isFollowing != undefined &&
        (isSmallScreen || onlyVertical ? (
          <PostDetailsVertical
            author={author}
            post={post}
            isFollowing={isFollowing}
            isSaved={isSaved}
            handleSaveButton={handleSaveButton}
            isLiked={isLiked}
            handleLikeButton={handleLikeButton}
            likesCount={likesCount}
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
            likesCount={likesCount}
          />
        ))}
    </div>
  );
};

export default PostDetails;
