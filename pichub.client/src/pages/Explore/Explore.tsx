import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import ExploreSearchPanel from "../../components/SearchPanel/ExploreSearchPanel";

const Explore = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleResize = () => {
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
    setIsOpen(!isOpen);
  };

  return (
    <Layout currentPage={"explore"}>
      <div className="row p-1">
        <div className="col"></div>
        <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="row">
            {isSmallScreen && (
              <div className="p-0" ref={dropdownRef}>
                <div className="mx-auto px-1 w-100">
                  <input
                    onClick={() => toggleSearchPanel()}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    style={{ borderRadius: 8 }}
                  />
                </div>
                <ExploreSearchPanel isOpen={isOpen} />
              </div>
            )}
          </div>
          <div className="row mt-2">
            {Array.from({ length: 7 }, () => (
              <div className="col-4 p-1">
                <Link to={"/post"}>
                  <img
                    className="w-100"
                    src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                    alt=""
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col"></div>
      </div>
    </Layout>
  );
};

export default Explore;
