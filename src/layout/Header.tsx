import { Button, Col, Menu, Row } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLogout, getUser } from "src/api/background";

const menuItem: MenuItemType[] = [
  { key: 1, label: <Link to="/session">場次</Link> },
  { key: 2, label: <Link to="/signup">報名</Link> },
];

const Header: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <Row>
      <Col span={20}>
        <Menu items={menuItem} defaultSelectedKeys={["1"]} mode="horizontal" />
      </Col>
      <Col
        span={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
        }}
      >
        {user ? (
          <Button
            onClick={() => {
              getLogout();
              navigate("/login");
            }}
          >
            {user} 登出
          </Button>
        ) : (
          <Link to="/login">
            <Button>未登入</Button>
          </Link>
        )}
      </Col>
    </Row>
  );
};

export default Header;
