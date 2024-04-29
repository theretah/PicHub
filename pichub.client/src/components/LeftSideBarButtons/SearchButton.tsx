import React from "react";
import { Link } from "react-router-dom";

const SearchButton = ({ activePage, isLargeScreen, handleButton }: Props) => {
  return (
    <Link to={"/search"} onClick={handleButton} className="btn btn-dark w-100">
      <div className="row">
        <div
          className={`col-12 col-md-12 col-sm-12 col-lg-12 col-xl-3 px-0 ${
            window.innerWidth > 1199 && window.innerWidth < 1266
              ? "col-xl-12"
              : ""
          }`}
        >
          {activePage === "search" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-search opacity-75"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          )}
        </div>
        {isLargeScreen && (
          <div className="col d-flex align-items-center px-0">
            <span
              className={`text-light ${
                activePage === "search" ? "fw-bold" : ""
              }`}
            >
              Search
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default SearchButton;
