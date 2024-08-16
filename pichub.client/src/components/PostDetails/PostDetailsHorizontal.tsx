import { useState } from "react";
import useAuthStore from "../../auth/authStore";
import ChatButton from "../PostControlButtons/ChatButton";
import LikeButton from "../PostControlButtons/LikeButton";
import SaveButton from "../PostControlButtons/SaveButton";
import ShareButton from "../PostControlButtons/ShareButton";
import ProfileImage from "../ProfileImage/ProfileImage";
import { PostDetailsProps } from "./PostDetailsProps";
import { Link } from "react-router-dom";
import PostModal from "./PostModal";

const PostDetailsHorizontal = ({
  author,
  post,
  isFollowing,
  isLiked,
  isSaved,
  handleLikeButton,
  handleSaveButton,
  likesCount,
  handleFollowButton,
}: PostDetailsProps) => {
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const toggleOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="mt-2">
      <div
        className="mx-auto mt-3 shadow-lg border border-secondary"
        style={{ width: 852, height: 502 }}
      >
        <div className="row g-0 mx-auto">
          <div
            className="d-flex justify-content-center border-end border-secondary"
            style={{ width: 500, height: 500 }}
          >
            <img
              src={`data:image/png;base64,${post?.photoContent}`}
              className="img-fluid mx-auto object-fit-contain"
              alt="..."
            />
          </div>
          <div className="" style={{ width: 350, height: 500 }}>
            <div className="card-body bg-dark text-light border-0">
              <div className="d-flex justify-content-start px-2 py-1 align-items-center">
                <ProfileImage user={author} widthHeight={35} />
                <div className="ms-2 d-flex flex-column">
                  <div className="d-flex align-items-center">
                    <Link
                      to={`/${author?.userName}`}
                      className="m-0 text-decoration-none text-light fw-bold"
                      style={{ fontSize: 14 }}
                    >
                      {author?.userName}
                    </Link>
                    {author?.id != user?.id &&
                      (isFollowing ? (
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
                    style={{ fontSize: 12 }}
                  >
                    www.google.com
                  </Link>
                </div>

                <button
                  className="btn text-light p-0 ms-auto"
                  onClick={toggleOpen}
                >
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
                  toggleOpen={toggleOpen}
                  post={post}
                />
              </div>
              <hr className="my-0 mx-0" />
              {/* Caption */}
              <div
                className="overflow-y-auto p-2"
                style={{ height: post.commentsAllowed ? 275 : 315 }}
              >
                <p>{post?.caption}</p>
              </div>
              <hr className="my-0" />
              {/* Buttons */}
              <div className="p-2">
                <div className="row">
                  <div className="col-5 d-flex">
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
                <button className="btn fw-bold p-0 mb-0 mt-3 text-light">
                  {likesCount} likes
                </button>
                <p className="text-gray p-0">3 hours ago</p>
                {post.commentsAllowed && (
                  <div className="d-flex">
                    <ProfileImage user={post.author} widthHeight={35} />
                    <input
                      id="commentText"
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                      type="text"
                      className="form-control text-bg-dark border-0 "
                      placeholder="Add a comment..."
                    />
                    <button
                      className={`btn text-primary fw-bold px-1 ${
                        commentText === "" ? "invisible" : "visible"
                      }`}
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsHorizontal;
