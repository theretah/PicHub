import React from "react";
import StoryCircle from "../StoryCircle/StoryCircle";
const HomeStoriesBar = () => {
  let i = 0;
  const storiesBar = document.getElementById("storiesBar");
  if (storiesBar) {
    storiesBar.style.overflow = "auto";
  }
  return (
    <div className="w-100 fixed-top position-static px-0">
      <div className="row">
        <ul
          id="storiesBar"
          className="pt-2 overflow-x-scroll mx-auto px-0"
          style={{
            whiteSpace: "nowrap",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            width: 500,
          }}
        >
          {Array.from({ length: 15 }, () => (
            <li
              className="justify-content-center mx-1 d-inline"
              style={{ width: 75 }}
            >
              <StoryCircle key={i++} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeStoriesBar;
