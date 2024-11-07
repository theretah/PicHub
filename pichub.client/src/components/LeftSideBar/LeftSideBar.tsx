import { useEffect, useRef, useState } from "react";
import SearchButton from "./ActionButtons/SearchButton";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import MoreButton from "./ActionButtons/MoreButton";
import HomeButton from "./Buttons/HomeButton";
import ExploreButton from "./Buttons/ExploreButton";
import ReelsButton from "./Buttons/ReelsButton";
import MessagesButton from "./Buttons/MessagesButton";
import NotificationsButton from "./Buttons/NotificationsButton";
import CreateButton from "./Buttons/CreateButton";
import ProfileButton from "./Buttons/ProfileButton";

interface Props {
  currentPage: string;
  leftBarWidth: number;
}

const LeftSideBar = ({ currentPage, leftBarWidth }: Props) => {
  const { logout, user, fetchUser, isAuthenticated } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);
  const xl = 1200;

  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(searchOpen);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const [showFullButton, setShowFullButton] = useState(
    window.innerWidth >= xl &&
      !searchOpen &&
      !settingsOpen &&
      currentPage != "Messages"
  );

  // function logoutUser() {
  //   logout();
  //   navigate("/login");
  // }
  function handleMorebutton() {
    setSettingsOpen(true);
    setSearchOpen(false);
  }

  function handleSearchButton() {
    setSettingsOpen(false);
    let oldSearchOpenValue = !searchOpen;
    if (!searchRef.current) {
      setSearchOpen(oldSearchOpenValue);
      searchRef.current = oldSearchOpenValue;
      setShowFullButton(window.innerWidth >= xl && !searchRef.current);
    }
  }

  function handleSearchOutside() {
    if (searchRef.current) {
      setSearchOpen(false);
      searchRef.current = false;
      setShowFullButton(window.innerWidth >= xl && !searchRef.current);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setShowFullButton(
        window.innerWidth >= xl &&
          !searchRef.current &&
          currentPage != "Messages"
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div
      className="position-fixed border-gray border-end pt-5 bg-dark px-auto vh-100 m-0 z-3"
      style={
        showFullButton
          ? { width: leftBarWidth }
          : {
              width: 65,
            }
      }
    >
      <ul className="list-group" style={{ height: 675 }}>
        <div className="list-group-item bg-dark border-0 mb-4">
          <Link
            to={"/"}
            className={`text-decoration-none text-light px-0 d-flex h2 ${
              showFullButton && currentPage != "Messages"
                ? "justify-content-start"
                : "justify-content-center"
            }`}
          >
            {showFullButton && currentPage != "Messages" ? "PicHub" : "P"}
          </Link>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "60%" }}
        >
          <HomeButton
            currentPage={currentPage}
            dimension={22}
            showFullButton={showFullButton}
          />
          <SearchButton
            isOpen={searchOpen}
            handleButton={handleSearchButton}
            handleClickOutsideButton={handleSearchOutside}
            activePage={currentPage}
            showFullButton={showFullButton && currentPage != "Messages"}
          />
          <ExploreButton
            currentPage={currentPage}
            dimension={22}
            showFullButton={showFullButton}
          />
          <ReelsButton
            currentPage={currentPage}
            dimension={22}
            showFullButton={showFullButton}
          />
          <MessagesButton
            currentPage={currentPage}
            dimension={22}
            showFullButton={showFullButton}
          />
          <NotificationsButton
            currentPage={currentPage}
            dimension={22}
            showFullButton={showFullButton}
          />
          <CreateButton
            currentPage={currentPage}
            dimension={22}
            showFullButton={showFullButton}
          />
          <ProfileButton
            currentPage={currentPage}
            dimension={22}
            showFullButton={showFullButton}
            user={user}
          />
        </div>
      </ul>
      <div className="mt-auto">
        <MoreButton
          isOpen={false}
          handleButton={handleMorebutton}
          activePage={currentPage}
          showFullButton={showFullButton && currentPage != "Messages"}
          handleClickOutsideButton={() => {
            setSettingsOpen(false);
            setShowFullButton(true);
          }}
        />
        {/* <button className="btn btn-dark w-100" onClick={logoutUser}>
          <div className="row">
            <div className={`${showFullButton ? "col-3" : "col"} px-0`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-escape text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02" />
                <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732z" />
              </svg>
            </div>
            {showFullButton && currentPage != "Messages" && (
              <div className="col d-flex align-items-center px-0">
                <span
                  className={`text-danger ${
                    currentPage === "profile" ? "fw-bold" : ""
                  }`}
                >
                  Log out
                </span>
              </div>
            )}
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default LeftSideBar;
