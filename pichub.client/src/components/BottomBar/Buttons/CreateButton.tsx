import BottomBarButton from "../BottomBarButton";
import { Props } from "./Props";
import CreateFillIcon from "../../../icons/CreateFillIcon";
import CreateIcon from "../../../icons/CreateIcon";

const CreateButton = ({ currentPage, dimension }: Props) => {
  return (
    <BottomBarButton
      activePage={currentPage}
      buttonText="Create"
      to="/createPost"
    >
      {currentPage === "Create" ? (
        <CreateFillIcon dimension={dimension} />
      ) : (
        <CreateIcon dimension={dimension} />
      )}
    </BottomBarButton>
  );
};

export default CreateButton;
