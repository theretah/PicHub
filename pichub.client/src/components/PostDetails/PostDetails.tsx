import { useEffect, useState } from "react";
import useUserById from "../../react-query/hooks/userHooks/useUserById";
import useIsLiked from "../../react-query/hooks/postHooks/useIsLiked";
import useIsSaved from "../../react-query/hooks/postHooks/useIsSaved";
import useIsFollowing from "../../react-query/hooks/followHooks/useIsFollowing";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
import { Post } from "../../entities/PostDTO";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useAuthStore from "../../auth/authStore";
import useLike from "../../react-query/hooks/postHooks/useLike";
import useSave from "../../react-query/hooks/postHooks/useSave";
import useDisLike from "../../react-query/hooks/postHooks/useDisLike";
import useUnSave from "../../react-query/hooks/postHooks/useUnSave";
import useLikesCount from "../../react-query/hooks/postHooks/useLikesCount";
import useFollow from "../../react-query/hooks/followHooks/useFollow";
import useUnfollow from "../../react-query/hooks/followHooks/useUnfollow";

interface Props {
  post: Post;
  onlyVertical: boolean;
}

const PostDetails = ({ post, onlyVertical }: Props) => {
  const { isAuthenticated } = useAuthStore();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 985);
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
  const { data: isFollowing } = useIsFollowing({
    followingId: post.authorId,
    enabled: enabled,
  });

  const [isFollowingState, setIsFollowingState] = useState<boolean>(false);
  useEffect(() => {
    if (isFollowing != undefined) {
      setIsFollowingState(isFollowing);
    }
  }, [isFollowing]);

  const followMutation = useFollow();
  function followUser() {
    if (isFollowingState == false) {
      followMutation.mutate({ followingId: post.authorId });
      setIsFollowingState(true);
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
            handleFollowButton={() => console.log("Unauthorized")}
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
            handleFollowButton={() => console.log("Unauthorized")}
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
          isFollowing={isFollowingState}
          isSaved={isSavedState}
          handleSaveButton={handleSaveButton}
          isLiked={isLikedState}
          handleLikeButton={handleLikeButton}
          likesCount={likesCountState}
          handleFollowButton={followUser}
        />
      ) : (
        <PostDetailsHorizontal
          author={author}
          post={post}
          isFollowing={isFollowingState}
          isSaved={isSavedState}
          handleSaveButton={handleSaveButton}
          isLiked={isLikedState}
          handleLikeButton={handleLikeButton}
          likesCount={likesCountState}
          handleFollowButton={followUser}
        />
      )}
    </div>
  );
};

export default PostDetails;
