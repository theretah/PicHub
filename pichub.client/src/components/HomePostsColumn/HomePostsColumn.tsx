import React from "react";
import PostDetails from "../PostDetails/PostDetails";

const HomePostsColumn = () => {
  return (
    <div className="row">
      <div className="col">
        <PostDetails />
        <PostDetails />
        <PostDetails />
        <PostDetails />
      </div>
    </div>
  );
};

export default HomePostsColumn;
