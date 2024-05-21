import React from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  return Array.from({ length: 7 }, () => (
    <div className="col-4 p-1">
      <Link to={"/post"}>
        <img
          src="../../../public/images/profiles/v.jpg"
          className="img-fluid mx-auto object-fit-cover"
          alt="..."
          style={{ aspectRatio: 1 }}
        />
      </Link>
    </div>
  ));
};

export default Posts;
