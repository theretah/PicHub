import { Link } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import { User } from "../../entities/User";

interface Props {
  user: User;
}
const HomeSuggestDetails = ({ user }: Props) => {
  return (
    <div className="row my-3">
      <div className="col-2">
        <ProfileImage user={user} widthHeight={40} />
      </div>
      <div className="col-7">
        <div className="row">
          <Link
            to={`/profile/${user.userName}`}
            className="m-0 fw-bold text-light text-decoration-none"
          >
            {user.userName}
          </Link>
        </div>
        <div className="row">
          <small className="text-gray">Suggested for you</small>
        </div>
      </div>
      <div className="col-3 p-0 d-flex justify-content-end">
        <button className="btn btn-primary p-1 align-self-center">
          Follow
        </button>
      </div>
    </div>
  );
};

export default HomeSuggestDetails;
