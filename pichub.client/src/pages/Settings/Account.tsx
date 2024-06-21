import { Props } from "./Props";

const Account = ({ width }: Props) => {
  return (
    <form className={width}>
      <span className="h4">Account privacy</span>
    </form>
  );
};

export default Account;
