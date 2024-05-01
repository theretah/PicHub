import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileButton = ({
  activePage,
  isExtraLargeScreen,
  handleButton,
}: Props) => {
  return (
    <Link to={"/page"} onClick={handleButton} className="btn btn-dark w-100">
      <div className="row">
        <div className={`col-12 col-md-12 col-sm-12 col-lg-12 col-xl-3 px-0`}>
          {activePage === "profile" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-person-circle opacity-75"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          )}
        </div>
        {isExtraLargeScreen && (
          <div className="col d-flex align-items-center px-0">
            <span
              className={`text-light ${
                activePage === "profile" ? "fw-bold" : ""
              }`}
            >
              Profile
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProfileButton;
