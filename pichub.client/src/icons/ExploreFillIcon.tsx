import { Props } from "./Props";

const ExploreFillIcon = ({ dimension }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      fill="currentColor"
      className="bi bi-compass-fill"
      viewBox="0 0 16 16"
    >
      <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z" />
    </svg>
  );
};

export default ExploreFillIcon;
