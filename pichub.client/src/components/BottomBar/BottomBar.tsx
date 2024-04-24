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
  const [activePage, setAcitvePage] = useState(currentPage);

  return (
    <div className="container-fluid fixed-bottom">
      <div className="row bg-dark">
        <div className="col"></div>
        <div className="col-xl-4 col-lg-6 col-md-8 col-sm-12">
          <ul className="nav justify-content-around">
            <li className="nav-item mx-2">
              <HomeButton
                activePage={activePage}
                handleButton={() => setAcitvePage("home")}
              />
            </li>
            <li className="nav-item mx-2">
              <ExploreButton
                activePage={activePage}
                handleButton={() => setAcitvePage("search")}
              />
            </li>
            <li className="nav-item mx-2">
              <CreatePostButton
                activePage={activePage}
                handleButton={() => setAcitvePage("createPost")}
              />
            </li>
            <li className="nav-item mx-2">
              <ReelsButton
                activePage={activePage}
                handleButton={() => setAcitvePage("reels")}
              />
            </li>
            <li className="nav-item mx-2">
              <MessagesButton
                activePage={activePage}
                handleButton={() => setAcitvePage("messages")}
              />
            </li>
            <li className="nav-item mx-2">
              <ProfileButton
                activePage={activePage}
                handleButton={() => setAcitvePage("profile")}
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
