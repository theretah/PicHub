import BottomBarButton from "../BottomBarButton";
import { Props } from "./Props";
import ExploreFillIcon from "../../../icons/ExploreFillIcon";
import ExploreIcon from "../../../icons/ExploreIcon";

const ExploreButton = ({ currentPage, dimension }: Props) => {
  return (
    <BottomBarButton
      activePage={currentPage}
      buttonText="Explore"
      to="/explore"
    >
      {currentPage === "Explore" ? (
        <ExploreFillIcon dimension={dimension} />
      ) : (
        <ExploreIcon dimension={dimension} />
      )}
    </BottomBarButton>
  );
};

export default ExploreButton;
