import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthService from "./useAuthService";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import useAuthProvider from "../../Context/useAuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { authenticate, isLoading, error } = useAuthService();
  const { signIn } = useAuthProvider();

  const onFinish = async (values) => {
    try {
      const data = await signIn(values);

      message.success("Login Successful!");
      // redirect to dashboard
      console.log("Redirect to dashboard");
      navigate("/dashboard");

      return data;
    } catch (err) {
      console.error("Authentication failed: ", err);
      message.error("Authentication failed.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    message.error("Authentication failed.");
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh" }}>
      <Col span={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 6 }}>
        <Typography.Title level={2}>
          Welcome back! Please Login
        </Typography.Title>
        <Form
          name="login-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit(onFinish)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email && "error"}
            help={errors.email && errors.email.message}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required." }}
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
