import { User } from "../../entities/UserDTO";
interface Props {
  user: User | null | undefined;
  widthHeight: number;
}
const ProfileImage = ({ widthHeight, user }: Props) => {
  const src = user?.profileImageUrl
    ? `data:image/png;base64,${user?.profileImageUrl}`
    : "../../../public/images/profiles/default-profile.jpg";
  return (
    <img
      src={src}
      alt="profile image"
      height={widthHeight}
      width={widthHeight}
      className="rounded-circle object-fit-contain"
      style={{ aspectRatio: 1 }}
    />
  );
};

export default ProfileImage;
