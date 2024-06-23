import { useParams } from "react-router-dom";
import Profile from "../../components/Profile/Profile";

const ProfileReels = () => {
  const { userName } = useParams();
  return (
    <Profile userName={userName || ""} activeTab="reels">
      <div>Reels</div>
    </Profile>
  );
};

export default ProfileReels;
