import BackIcon from "../../../icons/BackIcon";

interface Props {
  dimension: number;
}
const BackButton = ({ dimension }: Props) => {
  return (
    <button className="btn text-light">
      <BackIcon dimension={dimension} />
    </button>
  );
};

export default BackButton;
