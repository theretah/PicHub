import React, { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}
const SettingsNavbar = ({ children }: Props) => {
  return (
    <div
      className="position-fixed border-end border-gray vh-100 pt-5"
      style={{ width: 200 }}
    >
      <ul className="list-group">
        <div className="d-flex flex-column">
          <div className="list-group-item bg-dark border-0 mb-3">
            <span className="h4 text-light">Settings</span>
          </div>
          {children}
        </div>
      </ul>
    </div>
  );
};

export default SettingsNavbar;
