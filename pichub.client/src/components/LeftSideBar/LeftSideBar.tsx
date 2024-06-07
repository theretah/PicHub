import { useEffect, useRef, useState } from "react";
import SearchButton from "../LeftSideBarButtons/SearchButton";
import LeftSideBarButton from "./LeftSideBarButton";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store";

interface Props {
  currentPage: string;
  leftBarWidth: number;
}

const LeftSideBar = ({ currentPage, leftBarWidth }: Props) => {
  const xl = 1200;
  const { logout, user, isAuthenticated, fetchUser } = useAuthStore();

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

  useEffect(() => {
    if (!isAuthenticated) fetchUser(localStorage.getItem("token") || "null");
  }, [isAuthenticated]);

  function logoutUser() {
    logout();
    navigate("/login");
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
      className="position-fixed border-gray border-end pt-3 bg-dark px-auto vh-100 m-0 z-3"
      style={
        showFullButton
          ? { width: leftBarWidth }
          : {
              width: 65,
            }
      }
    >
      <ul className="list-group" style={{ height: 700 }}>
        <div className="list-group-item bg-dark border-0">
          <span
            className={`text-light px-0 d-flex ${
              showFullButton && currentPage != "Messages"
                ? "justify-content-start"
                : "justify-content-center"
            }`}
            style={{ fontSize: 36 }}
          >
            {showFullButton && currentPage != "Messages" ? "PicHub" : "P"}
          </span>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "60%" }}
        >
          <LeftSideBarButton
            activePage={currentPage}
            buttonText="Home"
            showFullButton={showFullButton && currentPage != "Messages"}
            to="/"
          >
            {currentPage === "Home" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-house-door"
                viewBox="0 0 16 16"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>
            )}
          </LeftSideBarButton>

          <SearchButton
            isOpen={searchOpen}
            handleButton={handleSearchButton}
            handleClickOutsideButton={handleSearchOutside}
            activePage={currentPage}
            showFullButton={showFullButton && currentPage != "Messages"}
          />

          <LeftSideBarButton
            activePage={currentPage}
            buttonText="Explore"
            showFullButton={showFullButton && currentPage != "Messages"}
            to="/explore"
          >
            {currentPage === "Explore" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-compass-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-compass"
                viewBox="0 0 16 16"
              >
                <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
              </svg>
            )}
          </LeftSideBarButton>
          <LeftSideBarButton
            activePage={currentPage}
            buttonText="Reels"
            showFullButton={showFullButton && currentPage != "Messages"}
            to="/reels"
          >
            {currentPage === "Reels" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-film"
                viewBox="0 0 16 16"
              >
                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-film"
                viewBox="0 0 16 16"
              >
                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
              </svg>
            )}
          </LeftSideBarButton>
          <LeftSideBarButton
            activePage={currentPage}
            buttonText="Messages"
            showFullButton={showFullButton && currentPage != "Messages"}
            to="/messages"
          >
            {currentPage === "Messages" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-send-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-send"
                viewBox="0 0 16 16"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
            )}
          </LeftSideBarButton>
          <LeftSideBarButton
            activePage={currentPage}
            buttonText="Notifications"
            showFullButton={showFullButton && currentPage != "Messages"}
            to="/notifications"
          >
            {currentPage === "Notifications" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            )}
          </LeftSideBarButton>
          <LeftSideBarButton
            activePage={currentPage}
            buttonText="Create"
            showFullButton={showFullButton && currentPage != "Messages"}
            to="/createPost"
          >
            {currentPage === "Create" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-plus-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            )}
          </LeftSideBarButton>

          <LeftSideBarButton
            activePage={currentPage}
            buttonText="Profile"
            showFullButton={showFullButton && currentPage != "Messages"}
            to={user ? `/page/${user.id}` : "/login"}
          >
            {currentPage === "Profile" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            )}
          </LeftSideBarButton>
        </div>
      </ul>
      <div className="mt-auto">
        {/* <MoreButton
          handleButton={() => {
            setSearchOpen(false);
            setSettingsOpen(!settingsOpen);
            if (isExtraLargeScreen) {
              setShowFullButton(!showFullButton);
            }
          }}
          activePage={currentPage}
          showFullButton={showFullButton && currentPage != "Messages"}
          handleClickOutsideButton={() => {
            setSettingsOpen(false);
            setShowFullButton(true);
          }}
        /> */}
        <button className="btn btn-dark w-100" onClick={logoutUser}>
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
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
