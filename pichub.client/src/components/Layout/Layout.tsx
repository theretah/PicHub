import { ReactNode, useEffect, useState } from "react";
import BottomBar from "../BottomBar/BottomBar";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import SearchPanel from "../SearchPanel/SearchPanel";

interface Props {
  children: ReactNode;
  currentPage: string;
}

const Layout = ({ children, currentPage }: Props) => {
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
      if (currentPage == "Messages") {
        setLeftBarWidth(windowWidth < md ? 0 : 65);
      } else {
        setLeftBarWidth(windowWidth >= xl ? 200 : windowWidth < md ? 0 : 65);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="container-fluid z-1">
      <div className="row p-0">
        {windowWidth >= md && (
          <LeftSideBar currentPage={currentPage} leftBarWidth={leftBarWidth} />
        )}

        <div
          className="col min-vh-100 "
          style={{
            marginLeft: leftBarWidth,
            paddingBottom: bottomBarHeight,
          }}
        >
          {children}
        </div>
        {windowWidth < md && <BottomBar currentPage={currentPage} />}
      </div>
    </div>
  );
};

export default Layout;
