import { useEffect, useState } from "react";
import useUserById from "../../react-query/hooks/userHooks/useUserById";
import useIsLiked from "../../react-query/hooks/postHooks/useIsLiked";
import useIsSaved from "../../react-query/hooks/postHooks/useIsSaved";
import useIsFollowing from "../../react-query/hooks/followHooks/useIsFollowing";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
import { Post } from "../../entities/Post";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useAuthStore from "../../auth/authStore";
import useLike from "../../react-query/hooks/postHooks/useLike";
import useSave from "../../react-query/hooks/postHooks/useSave";
import useDisLike from "../../react-query/hooks/postHooks/useDisLike";
import useUnSave from "../../react-query/hooks/postHooks/useUnSave";
import useLikesCount from "../../react-query/hooks/postHooks/useLikesCount";

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

  const { data: likesCount } = useLikesCount({ postId: post.id });
  const [likesCountState, setLikesCountState] = useState<number>(likesCount);

  useEffect(() => {
    setLikesCountState(likesCount);
  }, [likesCount]);

  useEffect(() => {
    if (isLiked != undefined) setIsLikedState(isLiked);
    if (isSaved != undefined) setIsSavedState(isSaved);
  }, [isLiked, isSaved]);

  const likeMutation = useLike();
  const disLikeMutation = useDisLike();
  function handleLikeButton() {
    setIsLikedState(!isLikedState);
    if (isLikedState == true) {
      disLikeMutation.mutate({ postId: post.id });
      setLikesCountState(likesCountState - 1);
    } else {
      likeMutation.mutate({ postId: post.id });
      setLikesCountState(likesCountState + 1);
    }
  }

  const saveMutation = useSave();
  const unSaveMutation = useUnSave();
  function handleSaveButton() {
    setIsSavedState(!isSavedState);
    if (isSavedState == true) {
      unSaveMutation.mutate({ postId: post.id });
    } else {
      saveMutation.mutate({ postId: post.id });
    }
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
            likesCount={likesCountState}
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
            likesCount={likesCountState}
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
          likesCount={likesCountState}
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
          likesCount={likesCountState}
        />
      )}
    </div>
  );
};

export default PostDetails;
