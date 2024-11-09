import { Props } from "./Props";
import CreateFillIcon from "../../../icons/CreateFillIcon";
import CreateIcon from "../../../icons/CreateIcon";
import LeftSideBarButton from "../LeftSideBarButton";

const CreateButton = ({ currentPage, showFullButton, dimension }: Props) => {
  return (
    <LeftSideBarButton
      showFullButton={showFullButton}
      activePage={currentPage}
      buttonText="Create"
      to="/create-post"
    >
      {currentPage === "Create" ? (
        <CreateFillIcon dimension={dimension} />
      ) : (
        <CreateIcon dimension={dimension} />
      )}
    </LeftSideBarButton>
  );
};

export default CreateButton;
