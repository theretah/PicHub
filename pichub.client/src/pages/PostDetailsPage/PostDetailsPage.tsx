import React, { useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import PostDetails from "../../components/PostDetails/PostDetails";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { Link } from "react-router-dom";
import {
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";

const PostDetailsPage = () => {
  const [modal, setModal] = useState(false);

  const toggleOpen = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-10">
            {" "}
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-8">
                  <img
                    src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                    className="img-fluid w-100"
                    alt="..."
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
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
                      <span className="align-self-center flex-fill">
                        +Following
                      </span>
                      <button
                        className="btn text-dark p-0"
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
                                  <button className="btn w-100 py-3">
                                    Share to
                                  </button>
                                </li>
                                <li className="list-group-item align-self-center w-100 p-0">
                                  <button className="btn w-100 py-3">
                                    Copy link
                                  </button>
                                </li>
                                <li className="list-group-item align-self-center w-100 p-0">
                                  <button
                                    onClick={toggleOpen}
                                    className="btn w-100 py-3"
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
                    <hr />
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>

      <BottomBar currentPage="" />
    </>
  );
};

export default PostDetailsPage;
