import React, { useEffect, useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import SearchRecord from "../SearchRecord/SearchRecord";

interface Props {
  isOpen: boolean;
}
const SearchPanel = ({ isOpen }: Props) => {
  const xl = 1200;
  const transformSmall = "translate(55px, -138px)";
  const transformLarge = "translate(190px, -138px)";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [transform, setTransform] = useState(
    window.innerWidth >= xl
      ? transformLarge
      : window.innerWidth < xl
      ? transformSmall
      : ""
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setTransform(
        windowWidth >= xl
          ? transformLarge
          : windowWidth < xl
          ? transformSmall
          : ""
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div
      className={`rounded-end border-end bg-dark ${
        isOpen ? "show position-fixed m-0 vh-100" : ""
      }`}
      style={
        isOpen
          ? {
              transform: transform,
              width: 400,
            }
          : {
              width: 0,
              height: 0,
              visibility: "hidden",
            }
      }
      data-popper-placement="right-start"
    >
      <div className="p-3">
        <h3 className="text-light">Search</h3>
      </div>
      <div className="p-3">
        <input
          type="text"
          className="form-control"
          style={{ borderRadius: 8 }}
          placeholder="Search"
        />
      </div>

      <hr className="text-light" />

      <div className="row p-3">
        <h5 className="text-light">Recent</h5>
      </div>
      <div className="container">
        <SearchRecord />
        <SearchRecord />
        <SearchRecord />
      </div>
    </div>
  );
};

export default SearchPanel;
