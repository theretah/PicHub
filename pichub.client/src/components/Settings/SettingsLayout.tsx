import { ReactNode, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Navigate } from "react-router-dom";
import "./Settings.css";

import useAuthStore from "../../auth/authStore";
import SettingsNavbar from "./SettingsNavbar";
import SettingsNavbarButton from "./SettingsNavbarButton";
interface Props {
  children: ReactNode;
}
const SettingsLayout = ({ children }: Props) => {
  const { isAuthenticated } = useAuthStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <Layout currentPage="Page">
      <div className="row">
        <SettingsNavbar>
          <>
            <SettingsNavbarButton
              to="/settings/editprofile"
              text="Edit profile"
            >
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
            </SettingsNavbarButton>
            <SettingsNavbarButton
              to="/settings/accountprivacy"
              text="Account privacy"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
              </svg>
            </SettingsNavbarButton>
          </>
        </SettingsNavbar>
        <div className="col" style={{ paddingLeft: 212 }}>
          <div
            className={`mx-auto mt-5 text-light ${
              windowWidth < 900 ? "w-100" : "w-75"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsLayout;
