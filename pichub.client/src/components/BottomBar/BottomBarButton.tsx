import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  buttonText: string;
  activePage: string;
  children: ReactNode;
}

const BottomBarButton = ({ buttonText, activePage, to, children }: Props) => {
  const [currentPage, setCurrentPage] = useState(activePage);
  return (
    <li className="nav-item mx-2">
      <Link
        to={to}
        className={`nav-link text-light px-1 ${
          activePage === currentPage ? "active" : ""
        }`}
        aria-current="page"
        onClick={() => setCurrentPage(buttonText)}
      >
        {children}
      </Link>
    </li>
  );
};

export default BottomBarButton;
