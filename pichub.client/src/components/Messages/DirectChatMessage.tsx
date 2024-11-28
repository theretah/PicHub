import { useEffect, useRef, useState } from "react";
import DirectChatMessageButton from "./DirectChatMessageButton";
import { ChatLineDTO } from "../../entities/ChatLineDTO";
import useAuthStore from "../../auth/authStore";
import { useDeleteChatLine } from "../../react-query/hooks/ChatLineHooks";
import "./DirectChatMessage.css";

interface Props {
  chatLine: ChatLineDTO;
  senderId: string;
  showDate: boolean;
  isFirst: boolean;
  isLast: boolean;
  isAlone: boolean;
}

const DirectChatMessage = ({
  chatLine,
  senderId,
  showDate,
  isFirst,
  isLast,
  isAlone,
}: Props) => {
  const { user } = useAuthStore();
  const sentByUser = senderId == user?.id;
  const deleteChatLine = useDeleteChatLine();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const date = new Date(chatLine.createdAt);

  function generateShape(): string {
    if (sentByUser) {
      if (isAlone) return "byUser";
      if (isFirst && !isAlone && !isLast) return "byUserAndFirst";
      if (isLast && !isFirst && !isAlone) return "byUserAndLast";
      if (!isAlone && !isFirst && !isLast) return "byUserAndMiddle";
    } else {
      if (isAlone) return "notByUser";
      if (isFirst && !isAlone && !isLast) return "notByUserAndFirst";
      if (isLast && !isFirst && !isAlone) return "notByUserAndLast";
      if (!isAlone && !isFirst && !isLast) return "notByUserAndMiddle";
    }
    return "";
  }

  function onEnter() {
    setButtonVisible(true);
  }
  function onClick() {
    setButtonVisible(true);
  }
  function onLeave() {
    setButtonVisible(false);
  }

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setButtonVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  function unSend() {
    deleteChatLine.mutate(chatLine.id);
    setIsDeleted(true);
  }

  return (
    <>
      {showDate && (
        <div className="mx-auto mt-5 mb-2">
          <div className="d-flex justify-content-center">
            <span
              className="text-light bg-secondary py-1 px-2 rounded-pill"
              style={{ fontSize: 17 }}
            >
              {date.toLocaleString("default", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      )}
      {!isDeleted && (
        <div
          className={`w-100 d-flex mt-1 ${
            sentByUser ? "justify-content-end" : "justify-content-start"
          }`}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
          ref={divRef}
        >
          {sentByUser && buttonVisible && (
            <DirectChatMessageButton
              chatLine={chatLine}
              sentByUser={sentByUser}
              handleUnSendButton={unSend}
            />
          )}
          <div
            style={{
              maxWidth: window.innerWidth < 768 ? "85%" : "65%",
            }}
            onClick={onClick}
          >
            <div
              className={`${generateShape()}`}
              style={
                sentByUser
                  ? {
                      backgroundImage:
                        "linear-gradient(to left, #0aa2c0, #0d6efd)",
                    }
                  : { backgroundColor: "#343a40" }
              }
            >
              <div
                className={`card-body ${
                  sentByUser ? "ps-3 pe-2" : "ps-2 pe-3"
                }`}
                style={{ paddingTop: 10 }}
              >
                <ul className="list-group list-group-flush">
                  <li
                    className={`list-group-item bg-transparent p-0 text-light border-0 ${
                      sentByUser ? "ms-auto" : ""
                    }`}
                    style={{ fontSize: 17 }}
                  >
                    {chatLine.content}
                  </li>
                  <li
                    className={`list-group-item bg-transparent p-0 ${
                      sentByUser ? "ms-auto text-light" : "text-gray"
                    }`}
                    style={{ fontSize: 17 }}
                  >
                    {date.toLocaleString("en-US", {
                      hour: "numeric",
                      hour12: true,
                      minute: "2-digit",
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {!sentByUser && buttonVisible && (
            <DirectChatMessageButton
              chatLine={chatLine}
              sentByUser={sentByUser}
              handleUnSendButton={unSend}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DirectChatMessage;
