import { Link } from "react-router-dom";
interface Props {
  userName: string;
}
const MessageButton = ({ userName }: Props) => {
  return (
    <Link to={`/chats/direct/${userName}`} className="btn btn-secondary py-1">
      Message
    </Link>
  );
};

export default MessageButton;
