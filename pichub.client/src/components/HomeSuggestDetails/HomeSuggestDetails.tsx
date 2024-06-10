import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { User } from "../../auth/store";

interface Props {
  user: User;
}
const HomeSuggestDetails = ({ user }: Props) => {
  return (
    <div className="row my-3">
      <div className="col-2">
        <ProfileImage
          imageUrl={
            user.profileImageUrl
              ? `data:image/png;base64,${user.profileImageUrl}`
              : "../../../images/profiles/default-profile.jpg"
          }
          widthHeight={45}
        />
      </div>
      <div className="col-7">
        <div className="row">
          <p className="m-0 fw-bold text-light">{user.userName}</p>
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
