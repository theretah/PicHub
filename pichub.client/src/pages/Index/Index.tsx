import React from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import HomeStoriesBar from "../../components/HomeStoriesBar/HomeStoriesBar";

const Index = () => {
  return (
    <>
      <HomeStoriesBar />
      <HomeSideBar />
      <BottomBar />
    </>
  );
};

export default Index;
