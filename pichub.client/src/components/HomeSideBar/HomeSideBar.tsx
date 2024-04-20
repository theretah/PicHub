import React from "react";
import HomeSuggestDetails from "../HomeSuggestDetails/HomeSuggestDetails";

const HomeSideBar = () => {
  return (
    <div>
      <ul className="">
        <li className="list-group-item">
          <HomeSuggestDetails />
        </li>
        <li className="list-group-item">
          <HomeSuggestDetails />
        </li>
        <li className="list-group-item">
          <HomeSuggestDetails />
        </li>
        <li className="list-group-item">
          <HomeSuggestDetails />
        </li>
        <li className="list-group-item">
          <HomeSuggestDetails />
        </li>
      </ul>
    </div>
  );
};

export default HomeSideBar;
