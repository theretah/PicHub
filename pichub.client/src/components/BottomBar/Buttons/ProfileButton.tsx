import BottomBarButton from "../BottomBarButton";
import ProfileImage from "../../ProfileImage/ProfileImage";
import { User } from "../../../entities/User";
interface Props {
  currentPage: string;
  user: User | null;
  dimension: number;
}
const ProfileButton = ({ currentPage, user, dimension }: Props) => {
  return (
    <BottomBarButton
      activePage={currentPage}
      buttonText="Profile"
      to={user ? `/${user.userName}` : "/login"}
    >
      <ProfileImage user={user} widthHeight={dimension} />
    </BottomBarButton>
  );
};

export default ProfileButton;
