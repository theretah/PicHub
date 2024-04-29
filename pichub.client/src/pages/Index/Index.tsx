import HomeStoriesBar from "../../components/HomeStoriesBar/HomeStoriesBar";
import HomePostsColumn from "../../components/HomePostsColumn/HomePostsColumn";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";

const Index = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth <= 1200);
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Layout currentPage={"home"}>
      <div className="col-xl-2"></div>
      <div
        className={`col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 ${
          !isSmallScreen ? "mx-auto" : ""
        }`}
      >
        <HomeStoriesBar />
        <HomePostsColumn />
      </div>
      {!isLargeScreen && (
        <div className="col-xl-3 col-lg-0 col-md-0 col-sm-0 col-0">
          <HomeSideBar />
        </div>
      )}
    </Layout>
  );
};

export default Index;
