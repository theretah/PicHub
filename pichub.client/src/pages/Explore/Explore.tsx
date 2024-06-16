import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import ExploreSearchPanel from "../../components/SearchPanel/ExploreSearchPanel";
import { Post } from "../../interfaces/Post";
import axios from "axios";

const Explore = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllPosts();

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

  const getAllPosts = () => {
    axios.get(`/api/post/getAll`).then((res) => {
      setPosts(res.data);
    });
  };
  return (
    <Layout currentPage={"Explore"}>
      <div className="row">
        <div className="col"></div>
        <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
          {isSmallScreen && (
            <div className="row py-2 border-bottom border-gray px-1">
              <div className="p-0" ref={dropdownRef}>
                <div className="mx-auto px-1 w-100">
                  <input
                    onClick={() => toggleSearchPanel()}
                    type="text"
                    className="form-control text-light border-0"
                    placeholder="Search"
                    style={{ borderRadius: 8, backgroundColor: "#323436" }}
                  />
                </div>
                <ExploreSearchPanel isOpen={isOpen} />
              </div>
            </div>
          )}
          <div className={`row p-1`}>
            {posts?.map((post) => (
              <div className="col-4 p-1">
                <Link to={`/explore/reels`}>
                  <img
                    className="object-fit-cover w-100"
                    src={`data:image/png;base64,${post?.photoContent}`}
                    alt=""
                    style={{
                      aspectRatio: 1,
                    }}
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
