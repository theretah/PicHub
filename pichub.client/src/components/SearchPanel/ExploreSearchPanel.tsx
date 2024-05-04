import React, { useEffect, useState } from "react";
import SearchRecord from "../SearchRecord/SearchRecord";

interface Props {
  isOpen: boolean;
}

const ExploreSearchPanel = ({ isOpen }: Props) => {
  const panelWidth = 350;
  let i = 5;
  const [marginLeft, setMarginLeft] = useState(
    (window.innerWidth - panelWidth) / 2
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setMarginLeft((windowWidth - panelWidth) / 2);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div
      className={`dropdown-menu rounded bg-dark position-absolute ${
        isOpen ? "show" : ""
      }`}
      style={{
        width: panelWidth,
        left: marginLeft,
      }}
    >
      <div className="row p-3">
        <h5 className="text-light">Recent</h5>
      </div>
      <div className="container">
        {Array.from({ length: 5 }, () => (
          <SearchRecord />
        ))}
      </div>
    </div>
  );
};

export default ExploreSearchPanel;
