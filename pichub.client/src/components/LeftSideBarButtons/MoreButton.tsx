import React from "react";
import { Props } from "./Props";

const MoreButton = ({ activePage, showFullButton, handleButton }: Props) => {
  return (
    <button className="btn btn-dark w-100" onClick={handleButton}>
      <div className="row">
        <div className={`${showFullButton ? "col-3" : "col"} px-0`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
        {showFullButton && activePage != "Messages" && (
          <div className="col d-flex align-items-center px-0">
            <span
              className={`text-light ${
                activePage === "profile" ? "fw-bold" : ""
              }`}
            >
              More
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default MoreButton;
