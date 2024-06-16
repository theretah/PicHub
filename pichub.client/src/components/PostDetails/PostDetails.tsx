import { useEffect, useState } from "react";
import ShareButton from "../PostControlButtons/ShareButton";
import ChatButton from "../PostControlButtons/ChatButton";
import LikeButton from "../PostControlButtons/LikeButton";
import SaveButton from "../PostControlButtons/SaveButton";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import { Post } from "../../interfaces/Post";
import axios from "axios";
import useAuthStore, { User } from "../../auth/store";
import PostDetailsHorizontal from "./PostDetailsHorizontal";
import PostDetailsVertical from "./PostDetailsVertical";

interface Props {
  postId: number;
  onlyVertical: boolean;
}
const PostDetails = ({ postId, onlyVertical }: Props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { user } = useAuthStore();
  const [post, setPost] = useState<Post>();
  const [author, setAuthor] = useState<User>();

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const getPost = async () => {
    await axios.get(`/api/post/get?id=${postId}`).then((res) => {
      setPost(res.data);

      axios
        .get(`/api/account/getById?id=${res.data.authorId}`)
        .then((authorRes) => {
          setAuthor(authorRes.data);
        });
    });
  };

  const getLikesCount = async () => {
    await axios.get(`/api/post/getLikesCount?postId=${postId}`).then((res) => {
      setLikesCount(res.data);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getPost();
    getIsLiked();
    getIsSaved();
    getLikesCount();
  }, [postId]);

  async function getIsLiked() {
    await axios
      .get(`/api/post/isLiked?postId=${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setIsLiked(res.data);
      });
  }

  async function getIsSaved() {
    await axios
      .get(`/api/post/isSaved?postId=${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setIsSaved(res.data);
      });
  }

  async function handleLikeButton() {
    await axios
      .post(
        `/api/post/like?postId=${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setIsLiked(!isLiked);
        if (isLiked) {
          setLikesCount(likesCount - 1);
        } else {
          setLikesCount(likesCount + 1);
        }
      });
  }

  async function handleSaveButton() {
    await axios
      .post(
        `/api/post/save?postId=${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setIsSaved(!isSaved);
      });
  }
  return (
    <div className="row mx-auto">
      {author &&
        post &&
        user &&
        (isSmallScreen || onlyVertical ? (
          <PostDetailsVertical
            author={author}
            post={post}
            loggedInUser={user}
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
            loggedInUser={user}
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
