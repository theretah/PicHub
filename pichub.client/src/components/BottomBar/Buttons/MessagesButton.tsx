import BottomBarButton from "../BottomBarButton";
import { Props } from "./Props";
import SendFillIcon from "../../../icons/SendFillIcon";
import SendIcon from "../../../icons/SendIcon";

const MessagesButton = ({ currentPage, dimension }: Props) => {
  return (
    <BottomBarButton
      activePage={currentPage}
      buttonText="Messages"
      to="/chats/inbox"
    >
      {currentPage === "Messages" ? (
        <SendFillIcon dimension={dimension} />
      ) : (
        <SendIcon dimension={dimension} />
      )}
    </BottomBarButton>
  );
};

export default MessagesButton;
