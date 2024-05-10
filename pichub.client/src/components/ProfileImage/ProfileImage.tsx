import React from "react";

interface Props {
  imageUrl: string;
  widthHeight: number;
}
const ProfileImage = ({ widthHeight, imageUrl }: Props) => {
  return (
    <img
      src={imageUrl}
      alt=""
      height={widthHeight}
      width={widthHeight}
      className="rounded-circle border object-fit-contain"
    />
  );
};

export default ProfileImage;
