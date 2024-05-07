import { useEffect, useRef, useState } from "react";
import SearchRecord from "../SearchRecord/SearchRecord";

interface Props {
  isOpen: boolean;
}

const SearchPanel = ({ isOpen }: Props) => {
  const xl = 1200;
  const transformSmall = "translate(50px, -140px)";
  const transformLarge = "translate(185px, -140px)";
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
      className={`border-end rounded-0 bg-dark m-0 vh-100 position-fixed ${
        isOpen ? "visible d-block" : "invisible"
      }`}
      style={{ transform: transform, width: 400 }}
    >
      <div className="px-3 py-1 mt-4">
        <h3 className="text-light">Search</h3>
      </div>
      <div className="px-3 py-1">
        <input
          type="text"
          className="form-control"
          style={{ borderRadius: 8 }}
          placeholder="Search"
        />
      </div>

      <hr className="text-gray" />

      <div className="row px-3 py-1">
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

export default SearchPanel;
