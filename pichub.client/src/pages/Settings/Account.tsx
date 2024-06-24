import axios from "axios";
import useAuthStore from "../../auth/store";
import { useNavigate } from "react-router-dom";
import SettingsLayout from "../../components/Settings/SettingsLayout";

const Account = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  function deleteAccount() {
    axios.delete(`/api/account/delete?id=${user?.id}`);
    logout();
    navigate("/login");
  }
  return (
    <SettingsLayout>
      <form>
        <span className="h4">Account privacy</span>
      </form>
      <form onSubmit={deleteAccount}>
        <button type="submit" className="btn btn-danger">
          Delete account
        </button>
      </form>
    </SettingsLayout>
  );
};

export default Account;
