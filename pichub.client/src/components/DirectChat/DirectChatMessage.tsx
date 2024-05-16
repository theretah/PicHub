import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  sender: number;
}
interface BtnProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClick: () => void;
}

const DirectChatMessageButton = ({
  onPointerEnter,
  onPointerLeave,
  onClick,
}: BtnProps) => {
  return (
    <div
      className="h-100"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button
        className="btn p-0 text-light"
        style={{ width: 30, height: 30 }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </button>
    </div>
  );
};

const DirectChatMessage = ({ sender }: Props) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modal, setModal] = useState(false);

  function onEnter() {
    setButtonVisible(true);
  }
  function onLeave() {
    setButtonVisible(false);
  }

  const toggleOpen = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="row mt-2">
        <div className="col d-flex justify-content-center">
          <span className="text-light">5/16/2024</span>
        </div>
      </div>
      <div
        className={`d-flex mt-1 ${
          sender == 1 ? "justify-content-end" : "justify-content-start"
        }`}
      >
        {sender === 1 && buttonVisible && (
          <DirectChatMessageButton
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            onClick={toggleOpen}
          />
        )}
        <div
          style={{ width: "55%" }}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
        >
          <div
            className={`card text-light ${sender == 1 && ""}`}
            style={
              sender == 1
                ? {
                    backgroundImage:
                      "linear-gradient(to bottom right, #0aa2c0, #0d6efd)",
                  }
                : { backgroundColor: "#343a40" }
            }
          >
            <div className="card-body p-0">
              <span style={{ fontSize: 17 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                recusandae dolore incidunt expedita minima voluptatibus est
                tempora nostrum, iusto dignissimos!
              </span>
            </div>
          </div>
        </div>
        {sender === 0 && buttonVisible && (
          <>
            <DirectChatMessageButton
              onPointerEnter={onEnter}
              onPointerLeave={onLeave}
              onClick={toggleOpen}
            />
          </>
        )}
        <MDBModal open={modal} onClose={() => setModal(false)} tabIndex="-1">
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
                    <button className="btn w-100 py-3">Add to favorites</button>
                  </li>
                  <li className="list-group-item align-self-center w-100 p-0">
                    <Link to={"/post"} className="btn w-100 py-3">
                      Go to post
                    </Link>
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
    </>
  );
};

export default DirectChatMessage;
