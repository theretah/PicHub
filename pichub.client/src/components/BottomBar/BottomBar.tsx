import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeButton from "../BottomBarButtons/HomeButton";
import ExploreButton from "../BottomBarButtons/ExploreButton";
import CreatePostButton from "../BottomBarButtons/CreatePostButton";
import ProfileButton from "../BottomBarButtons/ProfileButton";
import MessagesButton from "../BottomBarButtons/MessagesButton";
import ReelsButton from "../BottomBarButtons/ReelsButton";

interface Props {
  currentPage: string;
}

const BottomBar = ({ currentPage }: Props) => {
  const [activePage, setActivePage] = useState(currentPage);

  return (
    <div
      className="container-fluid position-fixed bottom-0 bg-dark z-2"
      style={{
        height: 45,
      }}
    >
      <div className="row">
        <div className="col"></div>
        <div className="col-sm-12">
          <ul className="nav justify-content-around">
            <li className="nav-item mx-2">
              <HomeButton
                activePage={activePage}
                handleButton={() => setActivePage("home")}
              />
            </li>
            <li className="nav-item mx-2">
              <ExploreButton
                activePage={activePage}
                handleButton={() => setActivePage("explore")}
              />
            </li>
            <li className="nav-item mx-2">
              <CreatePostButton
                activePage={activePage}
                handleButton={() => setActivePage("createPost")}
              />
            </li>
            <li className="nav-item mx-2">
              <ReelsButton
                activePage={activePage}
                handleButton={() => setActivePage("reels")}
              />
            </li>
            <li className="nav-item mx-2">
              <MessagesButton
                activePage={activePage}
                handleButton={() => setActivePage("messages")}
              />
            </li>
            <li className="nav-item mx-2">
              <ProfileButton
                activePage={activePage}
                handleButton={() => setActivePage("profile")}
              />
            </li>
          </ul>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default BottomBar;
