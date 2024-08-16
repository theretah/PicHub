import { useEffect, useState } from "react";
import { User } from "../../../entities/User";
import TabsButton from "./TabsButton";

interface TabsRowProps {
  activeTab: string;
  fontSize: number;
  pageUser: User | undefined;
  userIsPageOwner: boolean;
  windowWidth: number;
}
const TabsRow = ({
  activeTab,
  fontSize,
  pageUser,
  userIsPageOwner,
  windowWidth,
}: TabsRowProps) => {
  const isExtraSmallScreen = windowWidth < 575;
  const [tabIconDimension, setTabIconDimension] = useState<number>();
  useEffect(() => {
    setTabIconDimension(windowWidth < 575 ? 24 : 14);
  }, [windowWidth]);
  return (
    <div
      className={`border-bottom border-gray w-100 ${
        windowWidth >= 768 ? "mt-3" : ""
      }`}
    >
      <ul
        className="nav nav-underline d-flex justify-content-evenly mx-auto"
        style={{ maxWidth: isExtraSmallScreen ? 600 : 400 }}
      >
        <TabsButton
          isSmallScreen={isExtraSmallScreen}
          to={`/${pageUser?.userName}`}
          text="POSTS"
          fontSize={fontSize}
          isActive={activeTab === "posts"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={tabIconDimension}
              height={tabIconDimension}
              fill="currentColor"
              className="bi bi-grid-3x3"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5V5h4V1zM5 6H1v4h4zm1 4h4V6H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5zm1 0v4h4v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11zm0-1h4V6h-4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11zm-1 0V1H6v4z" />
            </svg>
          }
        />
        <TabsButton
          isSmallScreen={isExtraSmallScreen}
          to={`/${pageUser?.userName}/reels`}
          text="REELS"
          fontSize={fontSize}
          isActive={activeTab === "reels"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={tabIconDimension}
              height={tabIconDimension}
              fill="currentColor"
              className="bi bi-film"
              viewBox="0 0 16 16"
            >
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
            </svg>
          }
        />
        <TabsButton
          isSmallScreen={isExtraSmallScreen}
          to={`/${pageUser?.userName}/tagged`}
          text="TAGGED"
          fontSize={fontSize}
          isActive={activeTab === "tagged"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={tabIconDimension}
              height={tabIconDimension}
              fill="currentColor"
              className="bi bi-person-badge"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
            </svg>
          }
        />
        {userIsPageOwner && (
          <TabsButton
            isSmallScreen={isExtraSmallScreen}
            to={`/saved`}
            text="SAVED"
            fontSize={fontSize}
            isActive={activeTab === "saved"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={tabIconDimension}
                height={tabIconDimension}
                fill="currentColor"
                className="bi bi-save"
                viewBox="0 0 16 16"
              >
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
              </svg>
            }
          />
        )}
      </ul>
    </div>
  );
};

export default TabsRow;
