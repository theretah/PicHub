import { useEffect, useRef, useState } from "react";
import SearchRecord from "../SearchRecord/SearchRecord";

interface Props {
  isOpen: boolean;
}

const SearchPanel = ({ isOpen }: Props) => {
  const xl = 1200;
  const translate = "translate(53px, -184px)";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let i = 0;

  const [transform, setTransform] = useState(translate);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div
      className={`border-end border-gray rounded-end bg-dark m-0 vh-100 position-fixed z-3 ${
        isOpen ? "visible d-block" : "invisible"
      }`}
      style={{ transform: transform, width: 412 }}
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
          <SearchRecord key={i++} />
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
