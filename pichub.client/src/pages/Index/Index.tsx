import React, { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import HomeStoriesBar from "../../components/HomeStoriesBar/HomeStoriesBar";
import HomePostsColumn from "../../components/HomePostsColumn/HomePostsColumn";
import HomeTopBar from "../../components/HomeTopBar/HomeTopBar";

const Index = () => {
  return (
    <>
      <HomeTopBar />
      <div className="container-fluid p-0">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-0 col-md-0 col-sm-0"></div>
            <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12">
              <HomeStoriesBar />

              <HomePostsColumn />
            </div>
            <div className="col-xl-3 col-lg-4 col-md-0 col-sm-0">
              <HomeSideBar />
            </div>
          </div>
        </div>
        <BottomBar currentPage="home" />
      </div>
    </>
  );
};

export default Index;
