import React, { ReactNode, useEffect, useState } from "react";
import BottomBar from "../BottomBar/BottomBar";
import HomePostsColumn from "../HomePostsColumn/HomePostsColumn";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import HomeStoriesBar from "../HomeStoriesBar/HomeStoriesBar";
import LeftSideBar from "../LeftSideBar/LeftSideBar";

interface Props {
  children: ReactNode;
  currentPage: string;
}

const Layout = ({ children, currentPage }: Props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [leftBarWidth, setLeftBarWidth] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setLeftBarWidth(window.innerWidth > 1265 ? 200 : 75);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="container-fluid position-relative"
      style={{ minHeight: "100%" }}
    >
      <div className="row">
        {!isSmallScreen && (
          <div
            className="col-md-1 col-lg-1 col-xl-2 position-fixed border-end pt-3 bg-dark min-vh-100"
            style={{ width: leftBarWidth }}
          >
            <LeftSideBar currentPage={currentPage} />
          </div>
        )}

        <div
          className="col-md-11 col-lg-11 col-xl-10 col-sm-12 min-vh-100 position-relative min-vh-100"
          style={{ paddingBottom: 45 }}
        >
          <div className="row">{children}</div>
        </div>
        {isSmallScreen && <BottomBar currentPage={currentPage} />}
      </div>
    </div>
  );
};

export default Layout;
