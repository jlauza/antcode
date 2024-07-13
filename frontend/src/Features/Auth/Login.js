import React, { useState } from "react";
import useAuthService from "./useAuthService";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { useForm } from "react-hook-form";

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const [form] = Form.useForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
    handleSubmit: (values) => {
      console.log("values", values);
    },
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          onFinish={handleSubmit(onFinish)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
            validateStatus={errors.username && "error"}
            help={errors.username && errors.username.message}
          >
            <Input
              {...register("username", {
                required: "Username is required",
              })}
            />
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
            validateStatus={errors.password && "error"}
            help={errors.password && errors.password.message}
          >
            <Input.Password
              {...register("password", {
                required: "Password is required",
              })}
            />
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
