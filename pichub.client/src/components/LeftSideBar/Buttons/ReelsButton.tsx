import { Props } from "./Props";
import LeftSideBarButton from "../LeftSideBarButton";
import FilmIcon from "../../../icons/FilmIcon";

const ReelsButton = ({ currentPage, showFullButton, dimension }: Props) => {
  return (
    <LeftSideBarButton
      activePage={currentPage}
      buttonText="Reels"
      showFullButton={showFullButton && currentPage != "Messages"}
      to="/reels"
    >
      <FilmIcon dimension={dimension} />
    </LeftSideBarButton>
  );
};

export default ReelsButton;
