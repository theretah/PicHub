import React, { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const Explore = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout currentPage={"explore"}>
      <div className="row">
        <div className="col-xl-2 col-lg-1 col-md-1"></div>
        <div className="col-xl-10 col-lg-11 col-md-11 col-sm-12 col-12">
          <div className="row">
            {isSmallScreen && (
              <div className="mb-3 px-1">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: 8 }}
                />
              </div>
            )}

            {Array.from({ length: 7 }, () => (
              <div className="col-4 p-1">
                <Link to={"/post"}>
                  <img
                    className="w-100"
                    src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                    alt=""
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
