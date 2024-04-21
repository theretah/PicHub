import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const HomeSuggestDetails = () => {
  return (
    <div className="card mb-3 border-0">
      <div className="row g-0">
        <div className="col-md-2">
          <ProfileImage
            imageUrl="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
            widthHeight={45}
          />
        </div>
        <div className="col-md-10">
          <div className="card-body p-0">
            <p className="card-title m-0 fw-bold">
              username
              <span className="float-end text-primary mx-2">Follow</span>
            </p>

            <p className="card-text">
              <small className="text-body-secondary">Full Name</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSuggestDetails;
