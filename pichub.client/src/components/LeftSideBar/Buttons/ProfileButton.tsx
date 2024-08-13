import ProfileImage from "../../ProfileImage/ProfileImage";
import { User } from "../../../entities/User";
import LeftSideBarButton from "../LeftSideBarButton";
interface Props {
  currentPage: string;
  user: User | null;
  showFullButton: boolean;
  dimension: number;
}
const ProfileButton = ({
  currentPage,
  user,
  showFullButton,
  dimension,
}: Props) => {
  return (
    <LeftSideBarButton
      showFullButton={showFullButton}
      activePage={currentPage}
      buttonText="Profile"
      to={user ? `/${user.userName}` : "/login"}
    >
      <ProfileImage user={user} widthHeight={dimension} />
    </LeftSideBarButton>
  );
};

export default ProfileButton;
