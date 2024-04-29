import React from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import Layout from "../../components/Layout/Layout";

const Messages = () => {
  return (
    <Layout currentPage={"messages"}>
      <div className="col-xl-2"></div>
      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
        <h1 className="text-light">Messages</h1>
      </div>
    </Layout>
  );
};

export default Messages;
