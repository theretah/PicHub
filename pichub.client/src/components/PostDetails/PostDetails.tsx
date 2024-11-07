import { useEffect, useState } from "react";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
import { PostDTO } from "../../entities/PostDTO";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useAuthStore from "../../auth/authStore";
import { useUserById } from "../../react-query/hooks/userHooks";
import {
  useDisLikePost,
  useIsLiked,
  useIsSaved,
  useLikePost,
  useLikesCount,
  useSavePost,
  useUnSavePost,
} from "../../react-query/hooks/PostHooks";
import { useFollow, useIsFollowing } from "../../react-query/hooks/FollowHooks";

interface Props {
  post: PostDTO;
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

  const { data: author } = useUserById(post.authorId);

  const enabled = author != null && isAuthenticated;

  const { data: isLiked } = useIsLiked(post.id, enabled);
  const [isLikedState, setIsLikedState] = useState<boolean>(isLiked || false);

  const { data: isSaved } = useIsSaved(post.id, enabled);
  const [isSavedState, setIsSavedState] = useState<boolean>(isSaved || false);

  const { data: likesCount } = useLikesCount(post.id);
  const [likesCountState, setLikesCountState] = useState<number>(likesCount);

  useEffect(() => {
    setLikesCountState(likesCount);
  }, [likesCount]);

  useEffect(() => {
    if (isLiked != undefined) setIsLikedState(isLiked);
    if (isSaved != undefined) setIsSavedState(isSaved);
  }, [isLiked, isSaved]);

  const likeMutation = useLikePost();
  const disLikeMutation = useDisLikePost();
  function handleLikeButton() {
    setIsLikedState(!isLikedState);
    if (isLikedState == true) {
      disLikeMutation.mutate(post.id);
      setLikesCountState(likesCountState - 1);
    } else {
      likeMutation.mutate(post.id);
      setLikesCountState(likesCountState + 1);
    }
  }
  const { data: isFollowing } = useIsFollowing(post.authorId, enabled);

  const [isFollowingState, setIsFollowingState] = useState<boolean>(false);
  useEffect(() => {
    if (isFollowing != undefined) {
      setIsFollowingState(isFollowing);
    }
  }, [isFollowing]);

  const followMutation = useFollow();
  function followUser() {
    if (isFollowingState == false) {
      followMutation.mutate(post.authorId);
      setIsFollowingState(true);
    }
  }

  const saveMutation = useSavePost();
  const unSaveMutation = useUnSavePost();
  function handleSaveButton() {
    setIsSavedState(!isSavedState);
    if (isSavedState == true) {
      unSaveMutation.mutate(post.id);
    } else {
      saveMutation.mutate(post.id);
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
