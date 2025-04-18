import { useUsers } from "../../react-query/hooks/userHooks";
import HomeSuggestDetails from "../HomeSuggestDetails/HomeSuggestDetails";

const HomeSideBar = () => {
  const { data } = useUsers();

  return (
    <ul className="p-0" style={{ width: 280 }}>
      <div className="row">
        <div className="col-8 d-flex">
          <div className="row align-self-center">
            <span className="text-gray fw-bold">Suggested for you</span>
          </div>
        </div>
        <div className="col p-0 d-flex justify-content-end">
          <button className="btn btn-dark fw-bold p-1">See all</button>
        </div>
      </div>
      {data?.map((user) => (
        <HomeSuggestDetails key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default HomeSideBar;
