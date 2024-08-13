import { Props } from "./Props";
import LeftSideBarButton from "../LeftSideBarButton";
import HeartFillIcon from "../../../icons/HeartFillIcon";
import HeartIcon from "../../../icons/HeartIcon";

const NotificationsButton = ({
  currentPage,
  showFullButton,
  dimension,
}: Props) => {
  return (
    <LeftSideBarButton
      activePage={currentPage}
      buttonText="Notifications"
      showFullButton={showFullButton && currentPage != "Messages"}
      to="/notifications"
    >
      {currentPage === "Notifications" ? (
        <HeartFillIcon dimension={dimension} />
      ) : (
        <HeartIcon dimension={dimension} />
      )}
    </LeftSideBarButton>
  );
};

export default NotificationsButton;
