import React, { useState } from "react";
import ShareButton from "../ShareButton/ShareButton";
import ChatButton from "../ChatButtton/ChatButton";
import LikeButton from "../LikeButton/LikeButton";
import HomeSuggestDetails from "../HomeSuggestDetails/HomeSuggestDetails";
import SaveButton from "../SaveButton/SaveButton";
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

const PostDetails = () => {
  const [modal, setModal] = useState(false);

  const toggleOpen = () => {
    setModal(!modal);
  };
  return (
    <div className="card mx-auto border-0" style={{ width: "470px" }}>
      <div className="card mb-1 border-0">
        <div className="row g-0">
          <div className="col-md-1">
            <img
              src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
              alt=""
              height={40}
              width={40}
              className="rounded-circle border mx-auto"
            />
          </div>
          <div className="col-md-11 d-flex">
            <div className="card-body p-0 align-self-center">
              <p className="card-title ms-2 my-0 fw-bold">username</p>
            </div>
            <button className="btn text-dark d-flex" onClick={toggleOpen}>
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
                        <button className="btn w-100 py-3">Go to post</button>
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

                  {/* <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleOpen}>
                      Close
                    </MDBBtn>
                    <MDBBtn>Save changes</MDBBtn>
                  </MDBModalFooter> */}
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </div>
        </div>
      </div>
      <img
        src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
        className="card-img-top border rounded"
        alt="..."
      />
      <div className="card-body px-0">
        <div className="d-flex">
          <div className="flex-grow-1">
            <LikeButton />
            <ChatButton />
            <ShareButton />
          </div>
          <SaveButton />
        </div>

        <p className="card-title fw-bold mt-3">186 likes</p>
        <p className="card-title fw-bold">username</p>
        <p className="card-title">
          <a href="" className="text-decoration-none text-dark">
            View all comments
          </a>
        </p>
        <p className="card-title">
          <a href="" className="text-decoration-none text-dark">
            Add a comment
          </a>
        </p>
      </div>
      <hr />
      <br />
    </div>
  );
};

export default PostDetails;
