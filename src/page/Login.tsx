import React from "react";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { postLogin } from "src/api/background";
import { PostLogin } from "src/api/interface";
import { useNavigate } from "react-router-dom";

interface FormValues extends PostLogin {}

const { Title } = Typography;
const { Item } = Form;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFormSubmit = (values: FormValues) => {
    postLogin(values)
      .then((res) => {
        if (res.data.status === "success") {
          if (res.data.data === "Login success") {
            navigate("/session");
          }
        }
      })
      .catch((err) => {
        if (err.response.data.status === "failed") {
          if (err.response.data.data === "Login failed") {
            if (err.response.data.message === "username incorrect") {
              message.error("登入失敗！帳號錯誤");
            }
            if (err.response.data.message === "password incorrect") {
              message.error("登入失敗！密碼錯誤");
            }
          }
        }
      });
  };

  return (
    <Row>
      <Col lg={{ span: 8, pull: 4, offset: 12 }} style={{ paddingTop: "10%" }}>
        <Title style={{ display: "flex", justifyContent: "center" }}>
          後臺系統登入
        </Title>
        <Form onFinish={onFormSubmit}>
          <Item name="username" label="帳號">
            <Input />
          </Item>
          <Item name="password" label="密碼">
            <Input.Password />
          </Item>
          <Item style={{ display: "flex", justifyContent: "center" }}>
            <Button htmlType="submit" type="primary">
              登入
            </Button>
          </Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
