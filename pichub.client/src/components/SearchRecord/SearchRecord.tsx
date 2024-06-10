import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { Link } from "react-router-dom";

const SearchRecord = () => {
  return (
    <Link to={"/page"} className="text-decoration-none">
      <div className="row py-2 my-1">
        <div className="col-2 d-flex align-items-center">
          <ProfileImage
            widthHeight={40}
            imageUrl="../../../images/profiles/default-profile.jpg"
          />
        </div>
        <div className="col-8 text-light px-0">
          <div className="row">
            <span className="fw-bold">username</span>
          </div>
          <div className="row">
            <span className="text-light text-gray">
              FullName - 32M Followers
            </span>
          </div>
        </div>
        <div className="col-2 text-light d-flex align-items-center justify-content-center">
          <button className="btn text-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default SearchRecord;
