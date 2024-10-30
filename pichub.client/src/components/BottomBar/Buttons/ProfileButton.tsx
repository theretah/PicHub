import BottomBarButton from "../BottomBarButton";
import ProfileImage from "../../ProfileImage/ProfileImage";
import { UserDTO } from "../../../entities/UserDTO";
interface Props {
  currentPage: string;
  user: UserDTO | null;
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
