import { Navigate, useNavigate } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import { User } from "../../entities/User";
import XIcon from "../../icons/XIcon";
import { useState } from "react";
import "./SelectRecord.css";
import useFollowersCount from "../../react-query/hooks/followHooks/useFollowersCount";
interface Props {
  user: User;
}
const SearchRecord = ({ user }: Props) => {
  const navigate = useNavigate();
  const { data: followersCount } = useFollowersCount({
    userId: user.id,
    enabled: user != null,
  });
  function onClickItem() {
    navigate(`/${user.userName}`);
    window.location.reload();
  }
  const [cursorHand, setCursorHand] = useState<boolean>(false);
  const [backColor, setBackColor] = useState<string>("bg-dark");
  function onEnter() {
    setCursorHand(true);
    setBackColor("bg-dark-subtle");
  }
  function onLeave() {
    setCursorHand(false);
    setBackColor("bg-dark");
  }
  return (
    <div
      onClick={onClickItem}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`text-decoration-none ${backColor}`}
      style={cursorHand == true ? { cursor: "pointer" } : {}}
    >
      <div className="row py-2 my-1">
        <div className="col-2 d-flex align-items-center">
          <ProfileImage user={user} widthHeight={40} />
        </div>
        <div className="col-8 text-light px-0">
          <div className="row">
            <span className="fw-bold">{user.userName}</span>
          </div>
          <div className="row">
            <span className="text-light text-gray">{user.fullName}</span>
            <span className="text-light text-gray">{`${followersCount} followers`}</span>
          </div>
        </div>
        <div className="col-2 text-light d-flex align-items-center justify-content-center">
          <button className="btn text-light">
            <XIcon dimension={26} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchRecord;
