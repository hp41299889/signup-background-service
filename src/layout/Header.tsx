import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import { Link } from "react-router-dom";

const menuItem: MenuItemType[] = [
  { key: 1, label: <Link to="/session">場次</Link> },
  { key: 2, label: <Link to="/signup">報名</Link> },
];

const Header: React.FC = () => {
  return (
    <Menu items={menuItem} defaultSelectedKeys={["1"]} mode="horizontal" />
  );
};

export default Header;
