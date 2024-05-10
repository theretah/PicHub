import React, { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import Layout from "../../components/Layout/Layout";

const Messages = () => {
  const md = 768;
  const xl = 1200;

  let initialLeftBarWidth =
    window.innerWidth >= xl ? 200 : window.innerWidth < md ? 0 : 65;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [leftBarWidth, setLeftBarWidth] = useState(initialLeftBarWidth);

  let initialPaddingBottom = window.innerWidth < md ? 45 : 0;
  const [bottomBarHeight, setBottomBarHeight] = useState(initialPaddingBottom);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      setBottomBarHeight(windowWidth < md ? 45 : 0);

      setLeftBarWidth(windowWidth >= xl ? 200 : windowWidth < md ? 0 : 65);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <Layout currentPage={"messages"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 border-end min-vh-100">a</div>
          <div className="col">a</div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
