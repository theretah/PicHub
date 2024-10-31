import { ReactNode } from "react";
import { Link } from "react-router-dom";
interface TabButtonProps {
  text: string;
  isActive: boolean;
  fontSize: number;
  icon: ReactNode;
  to: string;
  isSmallScreen: boolean;
}
const TabsButton = ({
  icon,
  text,
  isActive,
  fontSize,
  to,
  isSmallScreen,
}: TabButtonProps) => {
  return (
    <li className="nav-item">
      <Link
        to={to}
        className={`nav-link ${
          isActive ? "border-bottom text-light" : "text-gray"
        }`}
        style={{ fontSize: fontSize }}
      >
        <span className="d-flex align-items-center " style={{ fontSize: 14 }}>
          {icon}
          {!isSmallScreen && <>&nbsp;&nbsp;{text}</>}
        </span>
      </Link>
    </li>
  );
};

export default TabsButton;
