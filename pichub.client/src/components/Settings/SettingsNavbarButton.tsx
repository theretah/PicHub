import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SettingsNavbarButtonProps {
  handleClick: () => void;
  text: string;
  children: ReactNode;
  to: string;
}

const SettingsNavbarButton = ({
  handleClick,
  text,
  children,
  to,
}: SettingsNavbarButtonProps) => {
  return (
    <li className="list-group-item bg-dark border-0 p-0 mb-1">
      <Link
        to={to}
        className="btn btn-dark text-light w-100 d-flex justify-content-start"
        onClick={handleClick}
      >
        {children}
        <div className="ms-2">{text}</div>
      </Link>
    </li>
  );
};

export default SettingsNavbarButton;
