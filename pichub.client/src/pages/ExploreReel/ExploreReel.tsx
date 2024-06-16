import React from "react";
import Layout from "../../components/Layout/Layout";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import ChatButton from "../../components/PostControlButtons/ChatButton";
import LikeButton from "../../components/PostControlButtons/LikeButton";
import SaveButton from "../../components/PostControlButtons/SaveButton";
import ShareButton from "../../components/PostControlButtons/ShareButton";
import PostDetails from "../../components/PostDetails/PostDetails";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

const ExploreReel = () => {
  return (
    <Layout currentPage="Explore">
      <div className="mt-2">
        {isSmallScreen ? (
          <div className="row mx-auto">
            {id && post && (
              <PostDetails authorId={post.authorId} postId={parseInt(id)} />
            )}
          </div>
        ) : (
          <div
            className="mx-auto mt-3 shadow-lg border border-secondary"
            style={{ width: 802, height: 502 }}
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
              <div className="" style={{ width: 300, height: 500 }}>
                <div className="card-body bg-dark text-light border-0">
                  <div className="d-flex justify-content-start p-2">
                    <ProfileImage
                      imageUrl={
                        pageUser?.profileImageUrl
                          ? `data:image/png;base64,${pageUser?.profileImageUrl}`
                          : "/images/profiles/default-profile.jpg"
                      }
                      widthHeight={35}
                    />
                    &nbsp;
                    <span className="fw-bold align-self-center">
                      {pageUser?.userName}
                    </span>
                    &nbsp; &nbsp;
                    <button className="p-0 btn text-light text-gray text-decoration-none align-self-center">
                      Following
                    </button>
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
                    <MDBModal
                      open={modal}
                      onClose={() => setModal(false)}
                      tabIndex="-1"
                    >
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalBody className="p-0">
                            <ul className="list-group list-group-flush p-0 rounded">
                              <li className="list-group-item bg-dark align-self-center w-100 p-0">
                                <button className="btn text-danger w-100 fw-bold py-3">
                                  Report
                                </button>
                              </li>
                              <li className="list-group-item bg-dark align-self-center w-100 p-0">
                                <button className="btn text-danger w-100 fw-bold py-3">
                                  Unfollow
                                </button>
                              </li>
                              <li className="list-group-item bg-dark align-self-center w-100 p-0">
                                <button className="btn text-light w-100 py-3">
                                  Add to favorites
                                </button>
                              </li>
                              <li className="list-group-item bg-dark align-self-center w-100 p-0">
                                <button className="btn text-light w-100 py-3">
                                  Share to
                                </button>
                              </li>
                              <li className="list-group-item bg-dark align-self-center w-100 p-0">
                                <button className="btn text-light w-100 py-3">
                                  Copy link
                                </button>
                              </li>
                              <li className="list-group-item bg-dark align-self-center w-100 p-0">
                                <button
                                  onClick={toggleOpen}
                                  className="btn text-light w-100 py-3"
                                >
                                  Cancel
                                </button>
                              </li>
                            </ul>
                          </MDBModalBody>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                  </div>
                  <hr className="my-0 mx-0" />
                  <div className="overflow-y-auto p-2" style={{ height: 275 }}>
                    <p>{post?.caption}</p>
                  </div>
                  <hr className="my-0" />
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
                        <div className="me-2">
                          <ChatButton size={22} />
                        </div>
                        <div className="me-2">
                          <ShareButton size={22} />
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
                      {likes} likes
                    </button>
                    <p className="text-gray p-0">3 hours ago</p>
                    <div className="d-flex">
                      <ProfileImage
                        imageUrl={
                          "../../../images/profiles/default-profile.jpg"
                        }
                        widthHeight={35}
                      />
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExploreReel;