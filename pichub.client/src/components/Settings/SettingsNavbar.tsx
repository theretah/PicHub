import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}
const SettingsNavbar = ({ children }: Props) => {
  const [isSmall, setIsSmall] = useState(window.innerWidth < 576);
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 576);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);
  return (
    <div
      className="position-fixed border-end border-gray vh-100 pt-5"
      style={{ width: isSmall ? 65 : 200 }}
    >
      <ul className="list-group">
        <div className="d-flex flex-column">
          <div className="list-group-item bg-dark border-0 mb-3">
            <span className="h4 text-light">Settings</span>
          </div>
          {children}
        </div>
      </ul>
    </div>
  );
};

export default SettingsNavbar;
