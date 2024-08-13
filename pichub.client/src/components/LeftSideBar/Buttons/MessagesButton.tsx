import { Props } from "./Props";
import SendFillIcon from "../../../icons/SendFillIcon";
import SendIcon from "../../../icons/SendIcon";
import LeftSideBarButton from "../LeftSideBarButton";

const MessagesButton = ({ currentPage, showFullButton, dimension }: Props) => {
  return (
    <LeftSideBarButton
      showFullButton={showFullButton}
      activePage={currentPage}
      buttonText="Messages"
      to="/messages/inbox"
    >
      {currentPage === "Messages" ? (
        <SendFillIcon dimension={dimension} />
      ) : (
        <SendIcon dimension={dimension} />
      )}
    </LeftSideBarButton>
  );
};

export default MessagesButton;
