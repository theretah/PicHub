import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import ChatButton from "../PostControlButtons/ChatButton";
import LikeButton from "../PostControlButtons/LikeButton";
import SaveButton from "../PostControlButtons/SaveButton";
import ShareButton from "../PostControlButtons/ShareButton";
import ProfileImage from "../ProfileImage/ProfileImage";
import { PostDetailsProps } from "./PostDetailsProps";
import PostModal from "./PostModal";

const PostDetailsVertical = ({
  author,
  post,
  isFollowed,
  isLiked,
  isSaved,
  handleLikeButton,
  handleSaveButton,
  likesCount,
  handleFollowButton,
}: PostDetailsProps) => {
  const { user } = useAuthStore();
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const captionLength = post.caption != null ? post.caption.length : 0;

  const [modalOpen, setModalOpen] = useState(false);
  const toggleOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="mx-auto border-0 text-bg-dark p-0">
      <div className="border-0 text-bg-dark">
        <div className="row g-0">
          <div className="d-flex">
            <Link to={`/${author?.userName}`}>
              <ProfileImage user={author} widthHeight={40} />
            </Link>

            <div className="ms-2 d-flex flex-column">
              <div className="d-flex align-items-center">
                <Link
                  to={`/${author?.userName}`}
                  className="m-0 text-decoration-none text-light fw-bold"
                  style={{ fontSize: 15 }}
                >
                  {author?.userName}
                </Link>
                {author?.id != user?.id &&
                  (isFollowed ? (
                    <>
                      <span>&nbsp;•&nbsp;</span>
                      <div
                        className="p-0 text-decoration-none"
                        style={{ fontSize: 14 }}
                      >
                        <span className="text-gray">Following</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>&nbsp;•&nbsp;</span>
                      <button
                        className="p-0 btn text-primary fw-bold"
                        style={{ fontSize: 14 }}
                        onClick={handleFollowButton}
                      >
                        Follow
                      </button>
                    </>
                  ))}
              </div>
              <Link
                className="text-light text-decoration-none"
                to={"https://www.google.com"}
                style={{ fontSize: 13 }}
              >
                www.google.com
              </Link>
            </div>
            <button className="btn text-light ms-auto" onClick={toggleOpen}>
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
            <PostModal
              modalOpen={modalOpen}
              toggleOpen={() => setModalOpen(!modalOpen)}
              post={post}
            />
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
                handleLikeButton={handleLikeButton}
              />
            </div>
            {post.commentsAllowed && (
              <div className="me-2">
                <ChatButton size={22} postId={post.id} />
              </div>
            )}
            <div className="me-2">
              <ShareButton size={22} postId={post.id} />
            </div>
          </div>
          <div className="col d-flex justify-content-end">
            <SaveButton
              size={22}
              handleSaveButton={handleSaveButton}
              isSaved={isSaved}
            />
          </div>
        </div>

        <p className="card-title fw-bold mt-2">{likesCount} likes</p>
        <Link
          to={`/${author?.userName}`}
          className="card-title fw-bold d-inline text-decoration-none"
        >
          {author?.userName}{" "}
        </Link>
        {isCaptionExpanded == true ? (
          post.caption
        ) : post.caption &&
          captionLength >= 40 &&
          isCaptionExpanded == false ? (
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
        ) : (
          captionLength < 40 && post.caption
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

export default PostDetailsVertical;
