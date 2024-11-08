import axios from "axios";
import useAuthStore from "../../auth/authStore";
import { useNavigate } from "react-router-dom";
import SettingsLayout from "../../components/Settings/SettingsLayout";

const Account = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  function deleteAccount() {
    axios.delete("/api/auth/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
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
