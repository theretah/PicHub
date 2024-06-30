import React from "react";
import { Link } from "react-router-dom";

const EditProfileButton = () => {
  return (
    <Link
      className="btn btn-secondary me-1 py-1 ms-auto"
      to={"/settings/editprofile"}
    >
      Edit Profile
    </Link>
  );
};

export default EditProfileButton;
