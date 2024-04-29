import React from "react";
import PostDetails from "../PostDetails/PostDetails";
import HomeStoriesBar from "../HomeStoriesBar/HomeStoriesBar";

const HomePostsColumn = () => {
  return (
    <>
      <div className="row mx-auto" style={{ maxWidth: 475 }}>
        <PostDetails />
      </div>
    </>
  );
};

export default HomePostsColumn;
