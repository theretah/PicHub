import { useEffect, useRef } from "react";
import SearchPanel from "../../SearchPanel/SearchPanel";
import { Props } from "./Props";

const SearchButton = ({
  activePage,
  showFullButton,
  handleButton,
  handleClickOutsideButton,
  isOpen,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClickOutsideButton();
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
        onClick={handleButton}
        className={`btn btn-dark w-100 rounded ${isOpen && "show"}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="row">
          <div className={`${showFullButton ? "col-3" : "col"} px-0`}>
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
          </div>
          {showFullButton && activePage != "Messages" && (
            <div className="col d-flex align-items-center px-0">
              <span className={`text-light`}>Search</span>
            </div>
          )}
        </div>
      </button>
      <SearchPanel isOpen={isOpen} />
    </div>
  );
};

export default SearchButton;
