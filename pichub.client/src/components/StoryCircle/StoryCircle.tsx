import React, { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const StoryCircle = () => {
  const widthAndHeight = 65;
  return (
    <button
      className="btn p-0 text-light"
      style={{ width: widthAndHeight + 10 }}
    >
      <div className="text-bg-dark">
        <img
          src="../../../public/images/profiles/default-profile.jpg"
          alt=""
          height={widthAndHeight}
          width={widthAndHeight}
          className="rounded-circle border border-2 mx-auto"
        />
        <div className="card-body p-0">
          <p className="card-text" style={{ fontSize: ".85rem" }}>
            username...
          </p>
        </div>
      </div>
    </button>
  );
};

export default StoryCircle;
