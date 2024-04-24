import React from "react";
import StoryCircle from "../StoryCircle/StoryCircle";
const HomeStoriesBar = () => {
  const storiesBar = document.getElementById("storiesBar");
  if (storiesBar) {
    storiesBar.style.overflow = "auto";
  }
  return (
    <div className="container-fluid fixed-top position-static">
      <div className="row px-3">
        <ul
          id="storiesBar"
          className="pt-2 pb-1 overflow-x-scroll mx-auto px-0"
          style={{
            whiteSpace: "nowrap",
            width: 500,
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {Array.from({ length: 15 }, () => (
            <li
              className="justify-content-center mx-1 d-inline"
              style={{ width: 75 }}
            >
              <StoryCircle />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeStoriesBar;
