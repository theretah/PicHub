import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const HomeSuggestDetails = () => {
  return (
    <div className="row my-3">
      <div className="col-2">
        <ProfileImage
          imageUrl="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
          widthHeight={45}
        />
      </div>
      <div className="col-7">
        <div className="row">
          <p className="m-0 fw-bold text-light">username</p>
        </div>
        <div className="row">
          <small className="text-gray">Suggested for you</small>
        </div>
      </div>
      <div className="col-3 p-0 d-flex justify-content-end">
        <button className="btn btn-primary p-1 align-self-center">
          Follow
        </button>
      </div>
    </div>
  );
};

export default HomeSuggestDetails;
