import { Props } from "./Props";
import ExploreFillIcon from "../../../icons/ExploreFillIcon";
import ExploreIcon from "../../../icons/ExploreIcon";
import LeftSideBarButton from "../LeftSideBarButton";

const ExploreButton = ({ currentPage, showFullButton, dimension }: Props) => {
  return (
    <LeftSideBarButton
      showFullButton={showFullButton}
      activePage={currentPage}
      buttonText="Explore"
      to="/explore"
    >
      {currentPage === "Explore" ? (
        <ExploreFillIcon dimension={dimension} />
      ) : (
        <ExploreIcon dimension={dimension} />
      )}
    </LeftSideBarButton>
  );
};

export default ExploreButton;
