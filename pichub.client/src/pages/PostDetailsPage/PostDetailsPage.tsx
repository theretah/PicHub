import { useEffect, useState } from "react";
import PostDetails from "../../components/PostDetails/PostDetails";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import {
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import LikeButton from "../../components/PostControlButtons/LikeButton";
import ChatButton from "../../components/PostControlButtons/ChatButton";
import ShareButton from "../../components/PostControlButtons/ShareButton";
import SaveButton from "../../components/PostControlButtons/SaveButton";
import Layout from "../../components/Layout/Layout";
import "./PostDetailsPage.css";
const PostDetailsPage = () => {
  const [modal, setModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(538);
  const imageWidth = 600;
  const imageHeight = 600;

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
  function handleLikeButton() {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  }
  const toggleOpen = () => {
    setModal(!modal);
  };

  return (
    <Layout currentPage="">
      {isSmallScreen && (
        <div className="row mx-auto">
          <PostDetails />
        </div>
      )}
      {!isSmallScreen && (
        <>
          <div
            className="rounded px-0 mx-auto mt-3 border"
            style={{ width: 835, minHeight: 415, maxHeight: 515 }}
          >
            <div className="mx-auto">
              <div className="row g-0">
                <div style={{ width: 515 }}>
                  <img
                    src="../../../public/images/profiles/Aristotle_Altemps_Inv8575.jpg"
                    className="img-fluid h-100"
                    alt="..."
                  />
                </div>
                <div className="" style={{ width: 300 }}>
                  <div className="card-body bg-dark text-light border-0">
                    <div className="d-flex justify-content-start">
                      <ProfileImage
                        imageUrl={
                          "../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                        }
                        widthHeight={40}
                      />
                      &nbsp;
                      <span className="fw-bold align-self-center">
                        username
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
                    <hr className="mb-0" />
                    <div className="overflow-y-auto" style={{ height: 280 }}>
                      <div className="mt-2 px-2">
                        <ProfileImage
                          imageUrl={
                            "../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                          }
                          widthHeight={40}
                        />
                        &nbsp;
                        <span className="fw-bold align-self-center">
                          username
                        </span>
                        &nbsp; &nbsp;
                        <span className="text-gray">3h</span>
                      </div>
                      <br />
                      <p>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer. This is a wider card with supporting
                        text below as a natural lead-in to additional content.
                        This content is a little bit longer. This is a wider
                        card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer. This is a wider card with supporting
                        text below as a natural lead-in to additional content.
                        This content is a little bit longer. This is a wider
                        card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer. This is a wider card with supporting
                        text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </p>
                    </div>
                    <hr className="mt-0" />
                    <div className="row">
                      <div className="col-5 d-flex justify-content-between">
                        <LikeButton
                          isLiked={isLiked}
                          handleLikeBtn={handleLikeButton}
                          size={22}
                        />
                        <ChatButton size={22} />
                        <ShareButton size={22} />
                      </div>
                      <div className="col d-flex justify-content-end">
                        <SaveButton size={22} />
                      </div>
                    </div>
                    <button className="btn fw-bold p-0 mb-0 mt-3 text-light">
                      {likes} likes
                    </button>
                    <p className="text-gray p-0">3 hours ago</p>
                    <div className="d-flex">
                      <ProfileImage
                        imageUrl={
                          "../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                        }
                        widthHeight={40}
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
        </>
      )}
    </Layout>
  );
};

export default PostDetailsPage;
