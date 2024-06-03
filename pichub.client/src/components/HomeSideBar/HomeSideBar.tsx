import React, { useEffect, useState } from "react";
import HomeSuggestDetails from "../HomeSuggestDetails/HomeSuggestDetails";
import { User } from "../../context/AuthContext";
import axios from "axios";

const HomeSideBar = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>();
  useEffect(() => {
    axios.get(`/api/account/getall`).then((res) => setSuggestedUsers(res.data));
  }, []);
  let i = 0;
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
      {suggestedUsers?.map((user) => (
        <HomeSuggestDetails key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default HomeSideBar;
