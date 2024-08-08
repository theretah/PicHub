import { Link } from "react-router-dom";
import useUserById from "../../react-query/hooks/userHooks/useUserById";
import ProfileImage from "../ProfileImage/ProfileImage";

interface Props {
  isMedium: boolean;
  userId: string;
  isActive: boolean;
  setActive: () => void;
}
const ChatRecord = ({ isMedium, userId, isActive, setActive }: Props) => {
  const { data: targetUser } = useUserById({ userId: userId });

  return (
    <Link
      to={`/messages/direct/${targetUser?.userName}`}
      className={`list-group-item list-group-item-action list-group-item-dark-custom border-0 ${
        isActive ? "active" : ""
      }`}
      onClick={setActive}
    >
      <div className="row" style={{ width: isMedium ? 85 : 395 }}>
        <div className="p-0" style={{ width: 55, height: 55 }}>
          <ProfileImage user={targetUser} widthHeight={55} />
        </div>
        {!isMedium && (
          <div className="col ps-2">
            <p className="m-0 text-light">{targetUser?.userName}</p>
            <span className="text-gray" style={{ fontSize: 13 }}>
              Active 37m ago
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ChatRecord;
