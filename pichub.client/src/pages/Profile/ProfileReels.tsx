import { useParams } from "react-router-dom";
import Profile from "../../components/Profile/Profile";

const ProfileReels = () => {
  const { username } = useParams();
  return (
    <Profile username={username || ""} activeTab="reels">
      <div>Reels</div>
    </Profile>
  );
};

export default ProfileReels;
