import React from "react";
import { Link } from "react-router-dom";

const CreatePostButton = ({
  activePage,
  isLargeScreen,
  handleButton,
}: Props) => {
  return (
    <Link
      to={"/createPost"}
      onClick={handleButton}
      className="btn btn-dark w-100"
    >
      <div className="row">
        <div
          className={`col-12 col-md-12 col-sm-12 col-lg-12 col-xl-3 px-0 ${
            window.innerWidth > 1199 && window.innerWidth < 1266
              ? "col-xl-12"
              : ""
          }`}
        >
          {activePage === "createPost" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-plus-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-plus-square opacity-75"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          )}
        </div>
        {isLargeScreen && (
          <div className="col d-flex align-items-center px-0">
            <span
              className={`text-light ${
                activePage === "createPost" ? "fw-bold" : ""
              }`}
            >
              Create
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CreatePostButton;
