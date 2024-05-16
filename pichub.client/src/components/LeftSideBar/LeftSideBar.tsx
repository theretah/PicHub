import { useEffect, useRef, useState } from "react";

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
  leftBarWidth: number;
}
const LeftSideBar = ({ currentPage, leftBarWidth }: Props) => {
  const xl = 1200;

  let initialIsExtraLarge = window.innerWidth >= xl;

  const [activePage, setActivePage] = useState(currentPage);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useState(
    initialIsExtraLarge && activePage != "messages"
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsExtraLargeScreen(windowWidth >= xl && activePage != "messages");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div
      className="position-fixed border-gray border-end pt-3 bg-dark px-auto vh-100 m-0 z-3"
      style={
        activePage == "messages"
          ? { width: 65 }
          : {
              width: leftBarWidth,
            }
      }
    >
      <ul className="list-group" style={{ height: 700 }}>
        <div className="list-group-item bg-dark border-0">
          <span
            className={`text-light px-0 d-flex ${
              isExtraLargeScreen
                ? "justify-content-start"
                : "justify-content-center"
            }`}
            style={{ fontSize: 36 }}
          >
            {isExtraLargeScreen ? "PicHub" : "P"}
          </span>
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
      <div className="mt-auto">
        <MoreButton
          handleButton={() => setActivePage(activePage)}
          activePage={activePage}
          isExtraLargeScreen={isExtraLargeScreen}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
