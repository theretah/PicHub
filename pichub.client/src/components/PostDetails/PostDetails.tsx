import React, { useEffect, useState } from "react";
import ShareButton from "../PostControlButtons/ShareButton";
import ChatButton from "../PostControlButtons/ChatButton";
import LikeButton from "../PostControlButtons/LikeButton";
import HomeSuggestDetails from "../HomeSuggestDetails/HomeSuggestDetails";
import SaveButton from "../PostControlButtons/SaveButton";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Link, useParams } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import { User } from "../../context/AuthContext";
import { Post } from "../../interfaces/Post";
import axios from "axios";
interface Props {
  authorId: string;
  postId: number;
}
const PostDetails = ({ authorId, postId }: Props) => {
  const [post, setPost] = useState<Post>();
  const [author, setAuthor] = useState<User>();

  const [modal, setModal] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(536);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  const getPostAuthor = () => {
    axios.get(`/api/account/getbyid?id=${authorId}`).then((res) => {
      setAuthor(res.data);
    });
  };

  const getPost = () => {
    axios.get(`/api/post/get?id=${postId}`).then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPostAuthor();
    getPost();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleOpen = () => {
    setModal(!modal);
  };

  function handleLikeButton() {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  }

  return (
    <div className="mx-auto border-0 text-bg-dark p-0">
      <div className="border-0 text-bg-dark">
        <div className="row g-0">
          <div className="d-flex">
            <Link to={`/page/${authorId}`}>
              <ProfileImage
                imageUrl={"../../../public/images/profiles/square.png"}
                widthHeight={isSmallScreen ? 40 : 50}
              />
            </Link>

            <div className="card-body p-0 align-self-center">
              <Link
                className="card-title ms-2 my-0 fw-bold align-self-center text-decoration-none"
                to={`/page/${authorId}`}
              >
                {author?.userName}
              </Link>
              &nbsp; &nbsp;
              <button className="p-0 btn text-decoration-none align-self-center">
                <span className="text-gray">Following</span>
              </button>
            </div>
            <button className="btn text-light d-flex" onClick={toggleOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-three-dots align-self-center"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
              </svg>
            </button>
            <MDBModal
              open={modal}
              onClose={() => setModal(false)}
              tabIndex="-1"
            >
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalBody className="p-0">
                    <ul className="list-group list-group-flush p-0 rounded bg-dark">
                      <li className="list-group-item align-self-center w-100 p-0">
                        <button className="btn text-danger w-100 fw-bold py-3">
                          Report
                        </button>
                      </li>
                      <li className="list-group-item align-self-center w-100 p-0">
                        <button className="btn text-danger w-100 fw-bold py-3">
                          Unfollow
                        </button>
                      </li>
                      <li className="list-group-item align-self-center w-100 p-0">
                        <button className="btn w-100 py-3">
                          Add to favorites
                        </button>
                      </li>
                      <li className="list-group-item align-self-center w-100 p-0">
                        {post && (
                          <Link
                            to={`/post/${post.id}`}
                            className="btn w-100 py-3"
                          >
                            Go to post
                          </Link>
                        )}
                      </li>
                      <li className="list-group-item align-self-center w-100 p-0">
                        <button className="btn w-100 py-3">Share to</button>
                      </li>
                      <li className="list-group-item align-self-center w-100 p-0">
                        <button className="btn w-100 py-3">Copy link</button>
                      </li>
                      <li className="list-group-item align-self-center w-100 p-0">
                        <button onClick={toggleOpen} className="btn w-100 py-3">
                          Cancel
                        </button>
                      </li>
                    </ul>
                  </MDBModalBody>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </div>
        </div>
      </div>
      <img
        src={`data:image/png;base64,${post?.photoContent}`}
        className="card-img-top rounded my-1 object-fit-contain"
        alt="..."
      />
      <div className="card-body px-0">
        <div className="row">
          <div className="col-3 d-flex">
            <div className="me-2">
              <LikeButton
                size={22}
                isLiked={isLiked}
                handleLikeBtn={handleLikeButton}
              />
            </div>
            <div className="me-2">
              <ChatButton size={22} />
            </div>
            <div className="me-2">
              <ShareButton size={22} />
            </div>
          </div>
          <div className="col d-flex justify-content-end">
            <SaveButton size={22} />
          </div>
        </div>

        <p className="card-title fw-bold mt-2">{likes} likes</p>
        <Link
          to={`/page/${authorId}`}
          className="card-title fw-bold d-inline text-decoration-none"
        >
          {author?.userName}{" "}
        </Link>
        {isCaptionExpanded ? (
          post?.caption
        ) : (
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setIsCaptionExpanded(true);
            }}
            className="text-gray text-decoration-none py-0"
          >
            ...more
          </a>
        )}

        <p className="card-title">
          <a href="" className="text-decoration-none text-gray">
            View all comments
          </a>
        </p>
        <p className="card-title">
          <a href="" className="text-decoration-none text-gray">
            Add a comment
          </a>
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
