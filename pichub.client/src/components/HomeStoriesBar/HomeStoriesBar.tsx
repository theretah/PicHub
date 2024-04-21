import React from "react";
import StoryCircle from "../StoryCircle/StoryCircle";
const HomeStoriesBar = () => {
  return (
    <div className="container-fluid fixed-top position-static">
      <div className="row bg-dark">
        <div className="col"></div>
        <div className="col-md-6 col-sm-12">
          <ul className="nav justify-content-center py-3">
            <li className="nav-item justify-content-center mx-2">
              <StoryCircle />
            </li>
            <li className="nav-item justify-content-center mx-2">
              <StoryCircle />
            </li>
            <li className="nav-item justify-content-center mx-2">
              <StoryCircle />
            </li>
            <li className="nav-item justify-content-center mx-2">
              <StoryCircle />
            </li>
            <li className="nav-item justify-content-center mx-2">
              <StoryCircle />
            </li>
            <li className="nav-item justify-content-center mx-2">
              <StoryCircle />
            </li>
          </ul>
          {/* <ul className="list-group list-group-flush list-group-horizontal w-100">
            <li className="list-group-item mx-1">
              <img
                src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                alt=""
                height={60}
                className="rounded-circle"
              />
            </li>
            <li className="list-group-item">
              <img
                src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                alt=""
                height={60}
                className="rounded-circle"
              />
            </li>
            <li className="list-group-item">
              <img
                src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                alt=""
                height={60}
                className="rounded-circle"
              />
            </li>
          </ul> */}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default HomeStoriesBar;
