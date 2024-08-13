import ReelsIcon from "../../../icons/ReelsIcon";
import BottomBarButton from "../BottomBarButton";
import { Props } from "./Props";

const ReelsButton = ({ currentPage }: Props) => {
  return (
    <BottomBarButton activePage={currentPage} buttonText="Reels" to="/reels">
      <ReelsIcon dimension={26} />
    </BottomBarButton>
  );
};

export default ReelsButton;
