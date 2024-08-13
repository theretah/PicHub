interface Props {
  value: number;
  text: string;
  isExtraSmallScreen: boolean;
}
const StatsButton = ({ value, text, isExtraSmallScreen }: Props) => {
  return (
    <div className="d-inline fs-6">
      <div className={`${isExtraSmallScreen ? "d-flex flex-wrap" : ""}`}>
        <span
          className={`text-light fw-bold ${isExtraSmallScreen && "mx-auto"}`}
        >
          {value}
        </span>
        &nbsp;
        <span className={`text-gray ${isExtraSmallScreen && "mx-auto"}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default StatsButton;
