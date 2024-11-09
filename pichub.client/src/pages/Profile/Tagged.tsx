import { useParams } from "react-router-dom";
import Profile from "../../components/Profile/Profile";

const Tagged = () => {
  const { username } = useParams();
  return (
    <Profile username={username || ""} activeTab="tagged">
      <div>Tagged</div>
    </Profile>
  );
};

export default Tagged;
