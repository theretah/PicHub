import React from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import HomeStoriesBar from "../../components/HomeStoriesBar/HomeStoriesBar";
import HomePostsColumn from "../../components/HomePostsColumn/HomePostsColumn";

const Index = () => {
  return (
    <>
      <HomeStoriesBar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-md-6 col-sm-12">
            <HomePostsColumn />
          </div>
          <div className="col-md-3 col-sm-0">
            {" "}
            <HomeSideBar />
          </div>
        </div>
      </div>
      <BottomBar currentPage="home" />
    </>
  );
};

export default Index;
