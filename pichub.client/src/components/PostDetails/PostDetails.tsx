import { useEffect, useState } from "react";
import useUserById from "../../hooks/accountHooks/useUserById";
import useIsLiked from "../../hooks/postHooks/useIsLiked";
import useIsSaved from "../../hooks/postHooks/useIsSaved";
import useIsFollowing from "../../hooks/userHooks/useIsFollowing";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
import { Post } from "../../entities/Post";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useAuthStore from "../../auth/authStore";
import useLike from "../../hooks/postHooks/useLike";
import useSave from "../../hooks/postHooks/useSave";

interface Props {
  post: Post;
  onlyVertical: boolean;
}

const PostDetails = ({ post, onlyVertical }: Props) => {
  const { isAuthenticated } = useAuthStore();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 935);
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
  const [isLikedState, setIsLikedState] = useState<boolean>(isLiked || false);

  const { data: isSaved } = useIsSaved({ postId: post.id, enabled: enabled });
  const [isSavedState, setIsSavedState] = useState<boolean>(isSaved || false);

  const [likesCount, setLikesCount] = useState<number>(post.likesCount);
  useEffect(() => {
    setLikesCount(post.likesCount);
  }, [post.likesCount]);

  useEffect(() => {
    if (isLiked != undefined) setIsLikedState(isLiked);
    if (isSaved != undefined) setIsSavedState(isSaved);
  }, [isLiked, isSaved]);

  const likeMutation = useLike({ postId: post.id });
  function handleLikeButton() {
    likeMutation.mutate();
    setIsLikedState(!isLikedState);
    if (isLikedState == true) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
  }
  const saveMutation = useSave({ postId: post.id });
  function handleSaveButton() {
    saveMutation.mutate();
    setIsSavedState(!isSavedState);
  }

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
            likesCount={post.likesCount}
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
            likesCount={post.likesCount}
          />
        )}
      </div>
    );
  }

  if (
    author == undefined ||
    isLikedState == undefined ||
    isSavedState == undefined ||
    isFollowing == undefined
  ) {
    return <LoadingIndicator />;
  }

  return (
    <div className="row mx-auto">
      {isSmallScreen || onlyVertical ? (
        <PostDetailsVertical
          author={author}
          post={post}
          isFollowing={isFollowing}
          isSaved={isSavedState}
          handleSaveButton={handleSaveButton}
          isLiked={isLikedState}
          handleLikeButton={handleLikeButton}
          likesCount={likesCount}
        />
      ) : (
        <PostDetailsHorizontal
          author={author}
          post={post}
          isFollowing={isFollowing}
          isSaved={isSavedState}
          handleSaveButton={handleSaveButton}
          isLiked={isLikedState}
          handleLikeButton={handleLikeButton}
          likesCount={likesCount}
        />
      )}
    </div>
  );
};

export default PostDetails;
