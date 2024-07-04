import { useEffect, useRef, useState } from "react";
import DirectChatMessageButton from "./DirectChatMessageButton";
import { MessageDto } from "../../entities/Message";
import useAuthStore from "../../auth/authStore";
import { User } from "../../entities/User";

interface Props {
  message: MessageDto;
  sender: User;
}

const DirectChatMessage = ({ message, sender }: Props) => {
  const { user } = useAuthStore();
  const sentByUser = sender.id == user?.id;
  const [buttonVisible, setButtonVisible] = useState(false);

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

  return (
    <>
      {/* <div className="row mt-2">
        <div className="col d-flex justify-content-center">
          <span className="text-gray" style={{ fontSize: 13 }}>
            Jan 11, 2024, 10:21PM
          </span>
        </div>
      </div> */}
      <div
        className={`d-flex mt-1 ${
          sentByUser ? "justify-content-end" : "justify-content-start"
        }`}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        ref={divRef}
      >
        {sentByUser && buttonVisible && (
          <DirectChatMessageButton sentByUser={sentByUser} />
        )}
        <div
          style={{ width: window.innerWidth < 768 ? "85%" : "65%" }}
          onClick={onClick}
        >
          <div
            className={`card p-1 text-light ${sentByUser && ""}`}
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
              <span style={{ fontSize: 17 }}>{message.content}</span>
            </div>
          </div>
        </div>
        {!sentByUser && buttonVisible && (
          <DirectChatMessageButton sentByUser={sentByUser} />
        )}
      </div>
    </>
  );
};

export default DirectChatMessage;
