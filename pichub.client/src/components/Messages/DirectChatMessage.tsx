import { useEffect, useRef, useState } from "react";
import DirectChatMessageButton from "./DirectChatMessageButton";
import { ChatLineDTO } from "../../entities/ChatLineDTO";
import useAuthStore from "../../auth/authStore";
import { useDeleteChatLine } from "../../react-query/hooks/ChatLineHooks";

interface Props {
  chatLine: ChatLineDTO;
  senderId: string;
}

const DirectChatMessage = ({ chatLine, senderId }: Props) => {
  const { user } = useAuthStore();
  const sentByUser = senderId == user?.id;
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

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

  const deleteChatLine = useDeleteChatLine();

  function unSend() {
    deleteChatLine.mutate(chatLine.id);
    setIsDeleted(true);
  }

  return (
    <>
      {/* <div className="row mt-2">
        <div className="col d-flex justify-content-center">
          <span className="text-gray" style={{ fontSize: 13 }}>
            Jan 11, 2024, 10:21PM
          </span>
        </div>
      </div> */}
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
              sentByUser={sentByUser}
              handleUnSendButton={unSend}
            />
          )}
          <div
            style={{
              width: window.innerWidth < 768 ? "85%" : "65%",
            }}
            onClick={onClick}
          >
            <div
              className={` p-1 text-light ${
                sentByUser ? "rounded-start" : "rounded-end"
              }`}
              style={
                sentByUser
                  ? {
                      backgroundImage:
                        "linear-gradient(to bottom right, #0aa2c0, #0d6efd)",
                    }
                  : { backgroundColor: "#343a40" }
              }
            >
              <div className="card-body p-0">
                <span style={{ fontSize: 17 }}>{chatLine.content}</span>
              </div>
            </div>
          </div>
          {!sentByUser && buttonVisible && (
            <DirectChatMessageButton
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
