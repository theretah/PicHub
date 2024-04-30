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
  let initialIsSmall = window.innerWidth <= 768;
  let initialIsLarge = window.innerWidth > 1266;
  let initialLeftBarWidth = initialIsSmall ? 0 : initialIsLarge ? 200 : 65;

  const [isSmallScreen, setIsSmallScreen] = useState(initialIsSmall);
  const [isLargeScreen, setIsLargeScreen] = useState(initialIsLarge);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [leftBarWidth, setLeftBarWidth] = useState(initialLeftBarWidth);
  const [contentWidth, setContentWidth] = useState(
    window.innerWidth - initialLeftBarWidth
  );

  let initialPaddingBottom = initialIsSmall ? 45 : 0;
  const [bottomBarHeight, setBottomBarHeight] = useState(initialPaddingBottom);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSmallScreen(windowWidth <= 768);
      setIsLargeScreen(windowWidth > 1266);
      setLeftBarWidth(isSmallScreen ? 0 : isLargeScreen ? 200 : 65);

      setBottomBarHeight(isSmallScreen ? 45 : 0);
      setContentWidth(windowWidth - leftBarWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="container-fluid">
      <div className="row">
        {!isSmallScreen && (
          <div
            className="position-fixed border-end pt-3 bg-dark px-auto"
            style={{ width: leftBarWidth }}
          >
            <LeftSideBar currentPage={currentPage} />
          </div>
        )}

        <div
          className="col"
          style={{
            marginLeft: leftBarWidth,
          }}
        >
          {children}
        </div>
        {isSmallScreen && <BottomBar currentPage={currentPage} />}
      </div>
    </div>
  );
};

export default Layout;
