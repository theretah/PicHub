import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import MessagesLayout from "../../components/Messages/MessagesLayout";
import DirectChatMessage from "../../components/Messages/DirectChatMessage";
import useUserByUserName from "../../react-query/hooks/accountHooks/useUserByUserName";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import useChatExists from "../../react-query/hooks/messageHooks/useChatExists";
import useAuthStore from "../../auth/authStore";
import useSendMessage from "../../react-query/hooks/messageHooks/useSendMessage";
import useStartChat from "../../react-query/hooks/messageHooks/useStartChat";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import useGetChat from "../../react-query/hooks/messageHooks/useGetChat";
import useGetMessages from "../../react-query/hooks/messageHooks/useGetMessages";
import { MessageDto } from "../../entities/Message";

const Direct = () => {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const { userName } = useParams<string>();
  const [messageText, setMessageText] = useState<string>("");

  const {
    data: targetUser,
    isLoading,
    error,
  } = useUserByUserName({
    userName: userName || "",
  });

  const { data: chatExists } = useChatExists({
    recieverId: targetUser?.id || "",
    senderId: user?.id || "",
    enabled: !!targetUser,
  });

  const { data: chat } = useGetChat({
    recieverId: targetUser?.id || "",
    senderId: user?.id || "",
    enabled: chatExists == true,
  });

  const { data: messages } = useGetMessages({
    chatId: chat?.id || 0,
  });

  const [newMessages, setNewMessages] = useState<MessageDto[] | undefined>([]);

  useEffect(() => {
    console.log(messages);
    setNewMessages(messages);
  }, [messages]);

  const startChat = useStartChat({
    recieverId: targetUser?.id || "",
  });

  const sendMessage = useSendMessage({
    chatId: chat?.id || 0,
    content: messageText,
  });

  // const deleteChat = useDeleteChat({
  //   chatId: chat?.id || 0,
  // });

  function addMessage(message: MessageDto) {
    setNewMessages(
      (prevMessages) => prevMessages && [...prevMessages, message]
    );
  }
  function handleSendButton() {
    if (chatExists == false) {
      startChat.mutate();
      if (startChat.isSuccess) {
        sendMessage.mutate();
        if (sendMessage.isSuccess && user) {
          let m: MessageDto = {
            authorId: user.id,
            chatId: 1,
            content: messageText,
            date: new Date(Date.now()),
            id: 1,
          };
          addMessage(m);
          setMessageText("");
        }
      }
    } else {
      sendMessage.mutate();
      if (sendMessage.isSuccess && user) {
        let m: MessageDto = {
          authorId: user.id,
          chatId: 1,
          content: messageText,
          date: new Date(Date.now()),
          id: 1,
        };
        addMessage(m);
        setMessageText("");
      }
    }
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <p className="text-light">{error.message}</p>;

  return (
    <MessagesLayout>
      <div className="col pe-0">
        <div className="row border-bottom border-gray p-2 z-2">
          <div
            className="d-flex justify-content-between w-100 p-0"
            style={{ width: 45, height: 45 }}
          >
            <div>
              <ProfileImage user={targetUser} widthHeight={45} />

              <a href="" className="text-light text-decoration-none h5 ms-2">
                {targetUser?.userName}
              </a>
            </div>
            <div>
              <button className="btn text-light p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
              </button>
              <button className="btn text-light p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-camera-video"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
                  />
                </svg>
              </button>
              <button className="btn text-light p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className=" overflow-y-auto"
          style={{ height: isSmallScreen ? "78vh" : "83vh" }}
        >
          {
            // newMessages && user && targetUser && newMessages?.length > 0 ? (
            //   newMessages.map((message) => (
            messages && user && targetUser && messages?.length > 0 ? (
              messages.map((message) => (
                <DirectChatMessage
                  key={message.id}
                  message={message}
                  senderId={
                    message.authorId == user?.id ? user.id : targetUser.id
                  }
                />
              ))
            ) : (
              <div className="col d-flex justify-content-center mt-4">
                <div className="text-center">
                  <ProfileImage user={targetUser} widthHeight={100} />
                  <h4 className="mb-0 text-light mt-2">
                    {targetUser?.userName}
                  </h4>
                  <span className="text-gray d-block" style={{ fontSize: 14 }}>
                    {targetUser?.userName} · PicHub
                  </span>
                  <Link
                    to={`/${targetUser?.userName}`}
                    className="btn btn-secondary mt-3"
                  >
                    View profile
                  </Link>
                </div>
              </div>
            )
          }
        </div>
        <div className="row p-2 ">
          <div className="input-group border border-gray rounded-pill">
            <button className="btn text-light p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-emoji-smile"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
              </svg>
            </button>
            <input
              id="messageText"
              type="text"
              className="form-control text-bg-dark border-0"
              placeholder="Message..."
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              autoComplete="off"
            />
            {messageText === "" ? (
              <>
                <button className="btn text-light p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-mic"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                  </svg>
                </button>
                <button className="btn text-light p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-image"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                  </svg>
                </button>
                <button className="btn text-light p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                </button>
              </>
            ) : (
              <button onClick={handleSendButton} className="btn text-primary">
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </MessagesLayout>
  );
};

export default Direct;
