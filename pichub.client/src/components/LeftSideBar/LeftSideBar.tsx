import { useEffect, useState } from "react";

import HomeButton from "../LeftSideBarButtons/HomeButton";
import ProfileButton from "../LeftSideBarButtons/ProfileButton";
import ExploreButton from "../LeftSideBarButtons/ExploreButton";
import SearchButton from "../LeftSideBarButtons/SearchButton";
import ReelsButton from "../LeftSideBarButtons/ReelsButton";
import MessagesButton from "../LeftSideBarButtons/MessagesButton";
import NotificationsButton from "../LeftSideBarButtons/NotificationsButton";
import CreatePostButton from "../LeftSideBarButtons/CreatePostButton";
import MoreButton from "../LeftSideBarButtons/MoreButton";

interface Props {
  currentPage: string;
}
const LeftSideBar = ({ currentPage }: Props) => {
  const xl = 1200;

  let initialIsExtraLarge = window.innerWidth >= xl;

  const [isExtraLargeScreen, setIsExtraLargeScreen] =
    useState(initialIsExtraLarge);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      setIsExtraLargeScreen(windowWidth >= xl);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <>
      <ul className="list-group" style={{ height: 650 }}>
        <div className="list-group-item bg-dark border-0">
          <h1
            className={`text-light px-0 d-flex  ${
              isExtraLargeScreen
                ? "justify-content-start"
                : "justify-content-center"
            }`}
          >
            {isExtraLargeScreen ? "PicHub" : "P"}
          </h1>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "60%" }}
        >
          <HomeButton
            handleButton={() => setActivePage("home")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
          <SearchButton
            handleButton={() => setActivePage("search")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
          <ExploreButton
            handleButton={() => setActivePage("explore")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
          <ReelsButton
            handleButton={() => setActivePage("reels")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
          <MessagesButton
            handleButton={() => setActivePage("messages")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
          <NotificationsButton
            handleButton={() => setActivePage("notifications")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
          <CreatePostButton
            handleButton={() => setActivePage("createPost")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
          <ProfileButton
            handleButton={() => setActivePage("profile")}
            activePage={activePage}
            isExtraLargeScreen={isExtraLargeScreen}
          />
        </div>
      </ul>
      <div className="mt-5">
        <MoreButton
          handleButton={() => setActivePage(activePage)}
          activePage={activePage}
          isExtraLargeScreen={isExtraLargeScreen}
        />
      </div>
    </>
  );
};

export default LeftSideBar;
