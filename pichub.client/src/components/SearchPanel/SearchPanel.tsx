import { ChangeEvent, useEffect, useState } from "react";
import SearchRecord from "../SearchRecord/SearchRecord";
import useSearch from "../../react-query/hooks/userHooks/useSearch";

interface Props {
  isOpen: boolean;
}

const SearchPanel = ({ isOpen }: Props) => {
  const translate = "translate(53px, -184px)";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [searchQueryState, setSearchQueryState] = useState<string>("");
  const { data: searchResult } = useSearch({ searchQuery: searchQueryState });

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchQueryState(e.target.value);
  }

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
      style={{ transform: translate, width: 412 }}
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
          onChange={handleSearch}
        />
      </div>

      <hr className="text-gray" />

      <div className="row px-3 py-1">
        <h5 className="text-light">Recent</h5>
      </div>
      <div className="container">
        {searchResult?.map((user) => (
          <SearchRecord key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
