import React, { useState } from "react";
import useAuthService from "./useAuthService";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useForm } from "react-hook-form";

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const [getVal, setVal] = useState(initialValues);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log("values.username", values.username);
    console.log("values.password", values.password);
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
          onSubmit={handleSubmit(onSubmit)}
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
