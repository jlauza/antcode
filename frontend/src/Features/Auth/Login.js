import React from "react";
import useAuthService from "./useAuthService";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const [form] = Form.useForm();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { authenticate, isLoading, error } = useAuthService();

  const onFinish = async (values) => {
    try {
      const data = await authenticate(values);

      // redirect to dashboard
      console.log("Redirect to dashboard");

      return data;
    } catch (err) {
      console.error("Authentication failed: ", err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    message.error("Authentication failed.");
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
            validateStatus={errors.username && "error"}
            help={errors.username && errors.username.message}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required." }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            validateStatus={errors.password && "error"}
            help={errors.password && errors.password.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required." }}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
