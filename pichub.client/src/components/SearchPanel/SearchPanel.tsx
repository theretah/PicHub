import { useEffect, useState } from "react";
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
      className={`dropdown-menu rounded-end border-end bg-dark position-absolute m-0 vh-100 ${
        isOpen ? "show" : ""
      }`}
      style={{ transform: transform, width: 400 }}
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
        {Array.from({ length: 5 }, () => (
          <SearchRecord />
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
