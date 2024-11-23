import { useParams } from "react-router-dom";
import Profile from "../../components/Profile/Profile";

const Tagged = () => {
  const { userName } = useParams();
  return (
    <Profile userName={userName || ""} activeTab="tagged">
      <div>Tagged</div>
    </Profile>
  );
};

export default Tagged;
