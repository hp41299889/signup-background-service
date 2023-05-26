import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./Header";

const Base: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};

export default Base;
