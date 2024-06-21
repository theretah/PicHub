import React, { useEffect, useRef, useState } from "react";

interface BtnProps {
  sender: number;
}

const DirectChatMessageButton = ({ sender }: BtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropup, setIsDropup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownTranslate =
    sender === 0 ? "translate(5px, 35px)" : "translate(-135px, 35px)";
  const dropupTranslate =
    sender === 0 ? "translate(5px, -195px)" : "translate(-135px, -195px)";

  const [translate, setTranslate] = useState(
    isDropup ? dropupTranslate : dropdownTranslate
  );
  function onClick() {
    setIsOpen(!isOpen);
  }
  function onTouch(event: React.TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    const handleScroll = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        if (rect) {
          const isBottomHalf = rect.top > window.innerHeight / 2;
          setIsDropup(isBottomHalf);
          setTranslate(isBottomHalf ? dropupTranslate : dropdownTranslate);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={`h-100 btn-group`} ref={dropdownRef}>
      <button
        className="btn p-0 text-light rounded"
        style={{ width: 30, height: 30 }}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={onClick}
        onTouchStart={onTouch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </button>
      <ul
        className={`dropdown-menu dropdown-menu-dark ${isOpen ? "show" : ""}`}
        style={{ transform: translate }}
      >
        <li>
          <h6 className="dropdown-header text-gray" style={{ fontSize: 13 }}>
            Jan 11, 2024, 10:21PM
          </h6>
        </li>
        <hr className="p-0 my-1" />
        <li>
          <a
            className="dropdown-item d-flex justify-content-between align-items-center"
            href="#"
          >
            Reply
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-reply"
              viewBox="0 0 16 16"
            >
              <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item d-flex justify-content-between align-items-center"
            href="#"
          >
            Forward
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item d-flex justify-content-between align-items-center"
            href="#"
          >
            Copy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-copy"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
              />
            </svg>
          </a>
        </li>
        <hr className="p-0 my-1" />
        {sender == 0 ? (
          <li>
            <a
              className="dropdown-item text-danger d-flex justify-content-between align-items-center"
              href="#"
            >
              Report
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            </a>
          </li>
        ) : (
          <li>
            <a
              className="dropdown-item text-danger d-flex justify-content-between align-items-center"
              href="#"
            >
              Unsend
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DirectChatMessageButton;
