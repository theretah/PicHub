import HomeFillIcon from "../../../icons/HomeFillIcon";
import HomeIcon from "../../../icons/HomeIcon";
import LeftSideBarButton from "../LeftSideBarButton";
import { Props } from "./Props";

const HomeButton = ({ currentPage, showFullButton, dimension }: Props) => {
  return (
    <LeftSideBarButton
      activePage={currentPage}
      buttonText="Home"
      showFullButton={showFullButton && currentPage != "Messages"}
      to="/"
    >
      {currentPage === "Home" ? (
        <HomeFillIcon dimension={dimension} />
      ) : (
        <HomeIcon dimension={dimension} />
      )}
    </LeftSideBarButton>
  );
};

export default HomeButton;
