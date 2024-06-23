import axios from "axios";
import { Props } from "./Props";
import useAuthStore from "../../auth/store";
import { useNavigate } from "react-router-dom";

const Account = ({ width }: Props) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  function deleteAccount() {
    axios.delete(`/api/account/delete?id=${user?.id}`);
    logout();
    navigate("/login");
  }
  return (
    <>
      <form className={`mb-3 ${width}`}>
        <span className="h4">Account privacy</span>
      </form>
      <form className={`mb-3`} onSubmit={deleteAccount}>
        <button type="submit" className="btn btn-danger">
          Delete account
        </button>
      </form>
    </>
  );
};

export default Account;
