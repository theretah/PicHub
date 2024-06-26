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
      className="rounded-circle object-fit-contain"
      style={{ aspectRatio: 1 }}
    />
  );
};

export default ProfileImage;
