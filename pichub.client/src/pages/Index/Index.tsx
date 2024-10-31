import HomePostsColumn from "../../components/HomePostsColumn/HomePostsColumn";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import ExploreSearchPanel from "../../components/SearchPanel/ExploreSearchPanel";
import { Link } from "react-router-dom";
import useSearch from "../../react-query/hooks/userHooks/useSearch";

const Index = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchQueryState, setSearchQueryState] = useState<string>("");
  const { data: searchResult } = useSearch(searchQueryState);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchQueryState(e.target.value);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchPanelOpen(false);
      }
    };

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth <= 1200);
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearchPanel = () => {
    setIsSearchPanelOpen(!isSearchPanelOpen);
  };

  return (
    <Layout currentPage={"Home"}>
      <>
        {isSmallScreen && (
          <div className="row border-bottom border-gray py-2">
            <div className={`col d-flex justify-content-between`}>
              <div className="w-25">
                <span className="h1 text-light my-auto">PicHub</span>
              </div>
              <div className="d-flex" style={{ width: "65%" }}>
                <div className="p-0 w-100" ref={dropdownRef}>
                  <div className="mx-auto px-1 w-100">
                    <input
                      onClick={() => toggleSearchPanel()}
                      onChange={handleSearch}
                      type="text"
                      className="form-control text-light border-0"
                      placeholder="Search"
                      style={{ borderRadius: 8, backgroundColor: "#323436" }}
                    />
                  </div>
                  {searchResult && (
                    <ExploreSearchPanel
                      isOpen={isSearchPanelOpen}
                      records={searchResult}
                    />
                  )}
                </div>

                <Link to={"/notifications"} className="btn text-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="row" style={{ zIndex: 1 }}>
          <div className="col-xl-2 col-lg-0"></div>
          <div
            className={`col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 ${
              isSmallScreen ? "mx-auto" : ""
            }`}
          >
            {/* <HomeStoriesBar /> */}
            <HomePostsColumn />
          </div>
          {!isLargeScreen && (
            <div className="col-xl-4 col-lg-0 col-md-0 col-sm-0 col-0">
              <HomeSideBar />
            </div>
          )}
        </div>
      </>
    </Layout>
  );
};

export default Index;
