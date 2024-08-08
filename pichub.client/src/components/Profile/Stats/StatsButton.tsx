interface Props {
  value: number;
  text: string;
  isExtraSmallScreen: boolean;
}
const StatsButton = ({ value, text, isExtraSmallScreen }: Props) => {
  return (
    <div className="px-5 py-2">
      <p className="d-inline fs-6">
        <div className={`${isExtraSmallScreen ? "d-flex flex-wrap" : ""}`}>
          <span className={`fw-bold ${isExtraSmallScreen && "mx-auto"}`}>
            {value}
          </span>
          &nbsp;
          <span className={`text-gray ${isExtraSmallScreen && "mx-auto"}`}>
            {text}
          </span>
        </div>
      </p>
    </div>
  );
};

export default StatsButton;
