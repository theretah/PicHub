import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MessageRecord from "../../components/MessageRecord/MessageRecord";
import DirectChat from "../../components/DirectChat/DirectChat";
import { useAuth } from "../../context/useAuth";

const Messages = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const md = 768;
  const xl = 1200;
  const [activeMessage, setActiveMessage] = useState(false);

  let initialInboxWidth =
    window.innerWidth >= xl ? 200 : window.innerWidth < md ? 0 : 65;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [inboxWidth, setInboxWidth] = useState(initialInboxWidth);
  const [userIsAuthenticated, setUserIsAuthenticated] =
    useState(isAuthenticated);

  useEffect(() => {
    setUserIsAuthenticated(isAuthenticated);
    console.log(userIsAuthenticated);
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      setInboxWidth(windowWidth < 900 ? 90 : 400);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout currentPage={"Messages"}>
      <div className="container-fluid">
        <div
          className="row"
          style={
            windowWidth < 768 ? { height: "94vh" } : { minHeight: "100vh" }
          }
        >
          <div
            className="border-end border-gray p-0 position-relative z-1"
            style={{ width: inboxWidth }}
          >
            <div
              className="w-100"
              style={{
                width: inboxWidth,
                height: windowWidth < 768 ? "85vh" : "87vh",
              }}
            >
              <div className="w-100 mt-4">
                <div
                  className={`col d-flex ${
                    windowWidth < 900
                      ? "justify-content-start"
                      : "justify-content-between pe-2 "
                  }`}
                >
                  {windowWidth > 900 && (
                    <Link
                      to={"/login"}
                      className="btn btn-dark text-light px-0"
                    >
                      <span className="h4">username</span>
                      &nbsp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </Link>
                  )}
                  <button className="btn btn-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-100 text-light pe-3">
                <div className="col d-flex justify-content-between">
                  {windowWidth > 900 && (
                    <>
                      <span className="fs-6 fw-bold">Messages</span>
                      <Link to="/requests" className="text-decoration-none">
                        Requests (1)
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="w-100 mt-2" style={{ height: "100%" }}>
                <ul
                  className="list-group overflow-y-auto overflow-x-hidden h-100"
                  style={{
                    borderRadius: 0,
                  }}
                >
                  <MessageRecord
                    isMedium={windowWidth <= 900}
                    isSelected={activeMessage}
                    selectRecord={() => setActiveMessage(!activeMessage)}
                  />
                </ul>
              </div>
            </div>
          </div>
          {activeMessage ? (
            <DirectChat
              isSmall={windowWidth < 768}
              inboxWidth={inboxWidth}
              windowWidth={windowWidth}
            />
          ) : (
            <div className="col d-flex justify-content-center align-items-center">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="96"
                  height="96"
                  fill="currentColor"
                  className="bi bi-chat-text text-light"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                  <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8m0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5" />
                </svg>
                <h5 className="text-light mt-4">Your messages</h5>
                <span className="text-gray d-block">
                  Send a message to start a chat.
                </span>
                <button className="btn btn-primary mt-3">Send Message</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
