import React from "react";
import useAuthService from "./useAuthService";
import { Form, Input, Button, Row, Col, Typography } from "antd";
const api = process.env.REACT_APP_API_URL;

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh" }}>
      <Col span={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 6 }}>
        <Typography.Title level={2}>Login</Typography.Title>
        <Form
          name="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
