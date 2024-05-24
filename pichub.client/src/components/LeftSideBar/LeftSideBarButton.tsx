import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  buttonText: string;
  activePage: string;
  showFullButton: boolean;
  children: ReactNode;
}

const LeftSideBarButton = ({
  activePage,
  showFullButton,
  buttonText,
  to,
  children,
}: Props) => {
  return (
    <Link to={to} className="btn btn-dark w-100">
      <div className="row">
        <div
          className={`${
            showFullButton && window.innerWidth >= 1200 ? "col-3" : "col"
          } px-0`}
        >
          {children}
        </div>
        {showFullButton && activePage != "Messages" && (
          <div className="col d-flex align-items-center px-0">
            <span
              className={`text-light ${
                activePage === buttonText ? "fw-bold" : ""
              }`}
            >
              {buttonText}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default LeftSideBarButton;
