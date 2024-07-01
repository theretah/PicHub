import { useEffect, useRef, useState } from "react";
import DirectChatMessageButton from "./DirectChatMessageButton";

interface Props {
  sender: number;
}

const DirectChatMessage = ({ sender }: Props) => {
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
          sender == 1 ? "justify-content-end" : "justify-content-start"
        }`}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        ref={divRef}
      >
        {sender === 1 && buttonVisible && (
          <DirectChatMessageButton sender={sender} />
        )}
        <div
          style={{ width: window.innerWidth < 768 ? "85%" : "65%" }}
          onClick={onClick}
        >
          <div
            className={`card p-1 text-light ${sender == 1 && ""}`}
            style={
              sender == 1
                ? {
                    backgroundImage:
                      "linear-gradient(to bottom right, #0aa2c0, #0d6efd)",
                  }
                : { backgroundColor: "#343a40" }
            }
          >
            <div className="card-body p-0">
              <span style={{ fontSize: 17 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                recusandae dolore incidunt expedita minima voluptatibus est
                tempora nostrum, iusto dignissimos!
              </span>
            </div>
          </div>
        </div>
        {sender === 0 && buttonVisible && (
          <DirectChatMessageButton sender={sender} />
        )}
      </div>
    </>
  );
};

export default DirectChatMessage;
