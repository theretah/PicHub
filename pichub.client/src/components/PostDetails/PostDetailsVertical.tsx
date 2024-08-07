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
  isFollowing,
  isLiked,
  isSaved,
  handleLikeButton,
  handleSaveButton,
  likesCount,
}: PostDetailsProps) => {
  const { user } = useAuthStore();
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

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

            <div className="card-body p-0 align-self-center">
              <Link
                className="card-title ms-2 my-0 fw-bold align-self-center text-decoration-none"
                to={`/${author?.userName}`}
              >
                {author?.userName}
              </Link>
              {author?.id != user?.id &&
                (isFollowing ? (
                  <>
                    &nbsp; &nbsp;
                    <button className="p-0 btn text-decoration-none align-self-center">
                      <span className="text-gray">Following</span>
                    </button>
                  </>
                ) : (
                  <>
                    &nbsp; &nbsp;
                    <button className="p-0 btn text-primary fw-bold align-self-center">
                      Follow
                    </button>
                  </>
                ))}
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
          to={`/${author.userName}`}
          className="card-title fw-bold d-inline text-decoration-none"
        >
          {author.userName}{" "}
        </Link>
        {isCaptionExpanded
          ? post.caption
          : post.caption && (
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

export default PostDetailsVertical;
