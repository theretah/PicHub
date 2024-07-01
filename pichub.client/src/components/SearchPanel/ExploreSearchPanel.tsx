import { useEffect, useState } from "react";
import SearchRecord from "../SearchRecord/SearchRecord";
import { User } from "../../entities/User";

interface Props {
  isOpen: boolean;
  records: User[];
}

const ExploreSearchPanel = ({ isOpen, records }: Props) => {
  const panelWidth = 350;
  const [marginLeft, setMarginLeft] = useState(
    (window.innerWidth - panelWidth) / 2
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setMarginLeft((windowWidth - panelWidth) / 2);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div
      className={`dropdown-menu rounded bg-dark position-absolute ${
        isOpen ? "show" : ""
      }`}
      style={{
        width: panelWidth,
        left: marginLeft,
      }}
    >
      <div className="row p-3">
        <h5 className="text-light">Recent</h5>
      </div>
      <div className="container">
        {records?.map((user) => (
          <SearchRecord key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ExploreSearchPanel;
