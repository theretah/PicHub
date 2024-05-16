import React from "react";
import { Link } from "react-router-dom";

const ExploreButton = ({
  activePage,
  isExtraLargeScreen,
  handleButton,
}: Props) => {
  return (
    <Link to={"/explore"} onClick={handleButton} className="btn btn-dark w-100">
      <div className="row">
        <div
          className={`col-12 col-md-12 col-sm-12 col-lg-12 ${
            activePage == "messages" ? "col-xl-12" : "col-xl-3"
          } px-0`}
        >
          {activePage === "explore" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-compass-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-compass text-gray"
              viewBox="0 0 16 16"
            >
              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
            </svg>
          )}
        </div>
        {isExtraLargeScreen && (
          <div className="col d-flex align-items-center px-0">
            <span
              className={`text-light ${
                activePage === "explore" ? "fw-bold" : ""
              }`}
            >
              Explore
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ExploreButton;
