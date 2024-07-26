import { ReactNode, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, Navigate } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import useGetChats from "../../react-query/hooks/messageHooks/useGetChats";
import ChatRecord from "./ChatRecord";
interface Props {
  children: ReactNode;
}
const MessagesLayout = ({ children }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  const { data: chats } = useGetChats();

  const [activeChat, setActiveChat] = useState<number>();

  const md = 768;
  const xl = 1200;
  let initialInboxWidth =
    window.innerWidth >= xl ? 200 : window.innerWidth < md ? 0 : 65;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [inboxWidth, setInboxWidth] = useState(initialInboxWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      setInboxWidth(windowWidth < 1100 ? 90 : 400);
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
                    windowWidth < 1100
                      ? "justify-content-start"
                      : "justify-content-between pe-2 "
                  }`}
                >
                  {windowWidth > 1100 && (
                    <Link to={""} className="btn btn-dark text-light px-0">
                      <span className="h4">{user?.userName}</span>
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
                  {windowWidth > 1100 && (
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
                  {chats?.map((chat) => (
                    <ChatRecord
                      key={chat.id}
                      isActive={activeChat == chat.id}
                      setActive={() => setActiveChat(chat.id)}
                      userId={
                        chat.recieverId == user?.id
                          ? chat.senderId
                          : chat.recieverId
                      }
                      isMedium={windowWidth <= 1100}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default MessagesLayout;
