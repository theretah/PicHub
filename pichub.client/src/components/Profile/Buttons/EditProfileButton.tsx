import { Link } from "react-router-dom";
interface Props {
  isBiggerThanMedium: boolean;
}
const EditProfileButton = ({ isBiggerThanMedium }: Props) => {
  return (
    <Link
      className={`btn btn-secondary py-1 ${
        isBiggerThanMedium ? "mx-2" : "me-2"
      }`}
      to={"/settings/edit-profile"}
    >
      Edit Profile
    </Link>
  );
};

export default EditProfileButton;
