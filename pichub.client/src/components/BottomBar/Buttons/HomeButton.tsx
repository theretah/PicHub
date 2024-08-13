import BottomBarButton from "../BottomBarButton";
import { Props } from "./Props";
import HomeFillIcon from "../../../icons/HomeFillIcon";
import HomeIcon from "../../../icons/HomeIcon";

const HomeButton = ({ currentPage, dimension }: Props) => {
  return (
    <BottomBarButton activePage={currentPage} buttonText="Home" to="/">
      {currentPage === "Home" ? (
        <HomeFillIcon dimension={dimension} />
      ) : (
        <HomeIcon dimension={dimension} />
      )}
    </BottomBarButton>
  );
};

export default HomeButton;
