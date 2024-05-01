import React from "react";
import { Link } from "react-router-dom";

const ReelsButton = ({
  activePage,
  isExtraLargeScreen,
  handleButton,
}: Props) => {
  return (
    <Link to={"/reels"} onClick={handleButton} className="btn btn-dark w-100">
      <div className="row">
        <div className={`col-12 col-md-12 col-sm-12 col-lg-12 col-xl-3 px-0`}>
          {activePage === "reels" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-film"
              viewBox="0 0 16 16"
            >
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-film opacity-75"
              viewBox="0 0 16 16"
            >
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
            </svg>
          )}
        </div>
        {isExtraLargeScreen && (
          <div className="col d-flex align-items-center px-0">
            <span
              className={`text-light ${
                activePage === "reels" ? "fw-bold" : ""
              }`}
            >
              Reels
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ReelsButton;
