import { useEffect, useState } from "react";
import useUserById from "../../hooks/accountHooks/useUserById";
import useIsLiked from "../../hooks/postHooks/useIsLiked";
import useIsSaved from "../../hooks/postHooks/useIsSaved";
import useIsFollowing from "../../hooks/userHooks/useIsFollowing";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
import { Post } from "../../entities/Post";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useAuthStore from "../../auth/store";
import { isatty } from "tty";

interface Props {
  post: Post;
  onlyVertical: boolean;
}
interface Like {
  postId: number;
  userId: string;
}

const PostDetails = ({ post, onlyVertical }: Props) => {
  const { isAuthenticated } = useAuthStore();

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
  }, [window.innerWidth]);

  const { data: author } = useUserById({
    userId: post.authorId,
  });

  const enabled = author != null && isAuthenticated;
  const { data: isFollowing } = useIsFollowing({
    followingId: post.authorId,
    enabled: enabled,
  });

  const { data: isLiked } = useIsLiked({ postId: post.id, enabled: enabled });
  const { data: isSaved } = useIsSaved({ postId: post.id, enabled: enabled });

  async function handleLikeButton() {}

  async function handleSaveButton() {}

  if (!isAuthenticated && author) {
    return (
      <div className="row mx-auto">
        {isSmallScreen || onlyVertical ? (
          <PostDetailsVertical
            author={author}
            post={post}
            isFollowing={false}
            isSaved={false}
            handleSaveButton={() => console.log("Unauthorized")}
            isLiked={false}
            handleLikeButton={() => console.log("Unauthorized")}
          />
        ) : (
          <PostDetailsHorizontal
            author={author}
            post={post}
            isFollowing={false}
            isSaved={false}
            handleSaveButton={() => console.log("Unauthorized")}
            isLiked={false}
            handleLikeButton={() => console.log("Unauthorized")}
          />
        )}
      </div>
    );
  }

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
