import { Link } from "react-router-dom";
import { User } from "../../../entities/User";

interface ProfileUserNameButtonProps {
  user: User;
}
const ProfileUserNameButton = ({ user }: ProfileUserNameButtonProps) => {
  return (
    <Link to={"/login"} className="btn btn-dark text-light fw-bold">
      {user?.userName} &nbsp;
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-down"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
        />
      </svg>
    </Link>
  );
};

export default ProfileUserNameButton;
