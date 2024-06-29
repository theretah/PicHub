import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SettingsNavbarButtonProps {
  text: string;
  children: ReactNode;
  to: string;
}

const SettingsNavbarButton = ({
  text,
  children,
  to,
}: SettingsNavbarButtonProps) => {
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
    <li className="list-group-item bg-dark border-0 p-0 mb-1">
      <Link
        to={to}
        className={`btn btn-dark text-light d-flex ${isSmall && "w-100"}`}
      >
        {children}
        {!isSmall && <div className="ms-2">{text}</div>}
      </Link>
    </li>
  );
};

export default SettingsNavbarButton;
