import { useEffect, useState } from "react";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";
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
import { useFollow, useIsFollowed } from "../../react-query/hooks/FollowHooks";
import { PostDTO } from "../../entities/PostDTO";

interface Props {
  post: PostDTO;
  onlyVertical: boolean;
}

const PostDetails = ({ post, onlyVertical }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  const { data: author, isSuccess } = useUserById(post?.authorId || "", !!post);

  const { data: isFollowed } = useIsFollowed(
    post?.authorId || "",
    isSuccess && isAuthenticated && post.authorId != user?.id
  );
  const { data: isLiked } = useIsLiked(post.id, isSuccess && isAuthenticated);
  const { data: isSaved } = useIsSaved(post.id, isSuccess && isAuthenticated);
  const { data: likesCount } = useLikesCount(post.id, post != null);

  const saveMutation = useSavePost();
  const unSaveMutation = useUnSavePost();
  const followMutation = useFollow();
  const likeMutation = useLikePost();
  const disLikeMutation = useDisLikePost();

  const [isLikedState, setIsLikedState] = useState<boolean>(isLiked || false);
  const [isSavedState, setIsSavedState] = useState<boolean>(isSaved || false);
  const [likesCountState, setLikesCountState] = useState<number>(0);
  const [isFollowedState, setIsFollowedState] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  function followUser() {
    if (isFollowedState == false) {
      if (post != null) {
        followMutation.mutate(post.authorId);
      }
      setIsFollowedState(true);
    }
  }

  function handleSaveButton() {
    setIsSavedState(!isSavedState);
    if (isSavedState == true) {
      unSaveMutation.mutate(post.id);
    } else {
      saveMutation.mutate(post.id);
    }
  }

  useEffect(() => {
    if (isFollowed != undefined) {
      setIsFollowedState(isFollowed);
    }
  }, [isFollowed]);

  useEffect(() => {
    if (likesCount != undefined) setLikesCountState(likesCount);
  }, [likesCount]);

  useEffect(() => {
    if (isLiked != undefined) setIsLikedState(isLiked);
    if (isSaved != undefined) setIsSavedState(isSaved);
  }, [isLiked, isSaved]);

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

  // console.log("authorId: " + post?.authorId);
  // console.log("author: " + author);
  // console.log("isLikedState: " + isLikedState);
  // console.log("isSavedState: " + isSavedState);
  // console.log("isFollowed: " + isFollowed);
  // console.log("post: " + post);

  if (!author || !post) return <LoadingIndicator />;

  return isAuthenticated ? (
    <div className="row mx-auto">
      {isSmallScreen || onlyVertical ? (
        <PostDetailsVertical
          author={author}
          post={post}
          isFollowed={isFollowedState}
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
          isFollowed={isFollowedState}
          isSaved={isSavedState}
          handleSaveButton={handleSaveButton}
          isLiked={isLikedState}
          handleLikeButton={handleLikeButton}
          likesCount={likesCountState}
          handleFollowButton={followUser}
        />
      )}
    </div>
  ) : (
    <div className="row mx-auto">
      {isSmallScreen || onlyVertical ? (
        <PostDetailsVertical
          author={author}
          post={post}
          isFollowed={false}
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
          isFollowed={false}
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
};

export default PostDetails;
