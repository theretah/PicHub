import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchPanel from "../SearchPanel/SearchPanel";

const SearchButton = ({ activePage, isExtraLargeScreen }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="btn-group" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`btn btn-dark w-100 rounded ${isOpen && "show"}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="row">
          <div
            className={`col-12 col-md-12 col-sm-12 col-lg-12 ${
              activePage == "messages" ? "col-xl-12" : "col-xl-3"
            } px-0`}
          >
            {activePage === "search" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-search text-gray"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            )}
          </div>
          {isExtraLargeScreen && (
            <div className="col d-flex align-items-center px-0">
              <span
                className={`text-light ${
                  activePage === "search" ? "fw-bold" : ""
                }`}
              >
                Search
              </span>
            </div>
          )}
        </div>
      </button>
      <SearchPanel isOpen={isOpen} activePage={activePage} />
    </div>
  );
};

export default SearchButton;
