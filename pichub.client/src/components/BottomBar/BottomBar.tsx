import useAuthStore from "../../auth/authStore";
import CreateButton from "./Buttons/CreateButton";
import ExploreButton from "./Buttons/ExploreButton";
import HomeButton from "./Buttons/HomeButton";
import MessagesButton from "./Buttons/MessagesButton";
import ProfileButton from "./Buttons/ProfileButton";
import ReelsButton from "./Buttons/ReelsButton.";

interface Props {
  currentPage: string;
}
const BottomBar = ({ currentPage }: Props) => {
  const { user } = useAuthStore();
  return (
    <div
      className="container-fluid position-fixed bottom-0 bg-dark z-2 border-top border-gray"
      style={{
        height: 45,
      }}
    >
      <div className="row">
        <div className="col-0"></div>
        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
          <ul className="nav justify-content-between mx-auto">
            <HomeButton currentPage={currentPage} dimension={26} />
            <ExploreButton currentPage={currentPage} dimension={26} />
            <CreateButton currentPage={currentPage} dimension={26} />
            <ReelsButton currentPage={currentPage} dimension={26} />
            <MessagesButton currentPage={currentPage} dimension={26} />
            <ProfileButton
              currentPage={currentPage}
              user={user}
              dimension={26}
            />
          </ul>
        </div>
        <div className="col-0"></div>
      </div>
    </div>
  );
};

export default BottomBar;
