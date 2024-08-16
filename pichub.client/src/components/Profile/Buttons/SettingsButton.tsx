import { Link } from "react-router-dom";
import SettingsIcon from "../../../icons/SettingsIcon";

interface Props {
  dimension: number;
}
const SettingsButton = ({ dimension }: Props) => {
  return (
    <Link
      to={"/settings/editprofile"}
      className="btn btn-dark text-light p-1 ms-2"
    >
      <SettingsIcon dimension={dimension} />
    </Link>
  );
};

export default SettingsButton;
