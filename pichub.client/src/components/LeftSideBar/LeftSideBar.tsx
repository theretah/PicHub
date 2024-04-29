import React, { useEffect, useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import HomeButton from "../LeftSideBarButtons/HomeButton";
import ProfileButton from "../LeftSideBarButtons/ProfileButton";
import ExploreButton from "../LeftSideBarButtons/ExploreButton";
import SearchButton from "../LeftSideBarButtons/SearchButton";
import ReelsButton from "../LeftSideBarButtons/ReelsButton";
import MessagesButton from "../LeftSideBarButtons/MessagesButton";
import NotificationsButton from "../LeftSideBarButtons/NotificationsButton";
import CreatePostButton from "../LeftSideBarButtons/CreatePostButton";
import MoreButton from "../LeftSideBarButtons/MoreButton";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

interface Props {
  currentPage: string;
}
const LeftSideBar = ({ currentPage }: Props) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1266);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <ul className="list-group w-100" style={{ height: 650 }}>
        <div className="row">
          <div className="list-group-item bg-dark border-0">
            <h1
              className={`text-light px-0 d-flex  ${
                isLargeScreen
                  ? "justify-content-start"
                  : "justify-content-center"
              }`}
            >
              {isLargeScreen ? "PicHub" : "P"}
            </h1>
          </div>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "60%" }}
        >
          <HomeButton
            handleButton={() => setActivePage("home")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
          <SearchButton
            handleButton={() => setActivePage("search")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
          <ExploreButton
            handleButton={() => setActivePage("explore")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
          <ReelsButton
            handleButton={() => setActivePage("reels")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
          <MessagesButton
            handleButton={() => setActivePage("messages")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
          <NotificationsButton
            handleButton={() => setActivePage("notifications")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
          <CreatePostButton
            handleButton={() => setActivePage("createPost")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
          <ProfileButton
            handleButton={() => setActivePage("profile")}
            activePage={activePage}
            isLargeScreen={isLargeScreen}
          />
        </div>
      </ul>
      <div className="mt-5">
        <MoreButton
          handleButton={() => setActivePage(activePage)}
          activePage={activePage}
          isLargeScreen={isLargeScreen}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
