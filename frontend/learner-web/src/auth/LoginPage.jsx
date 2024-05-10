import React from "react";
import { Form, Input, Button , Space,  message} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

const LoginPage = () => {

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const onFinish =  async (values) => {
    console.log("Received values:", values);
    try {
      const response = await axios.post(
        "http://localhost:4200/learner/auth/login",
        values
      );
      console.log("Form values:", values);
      console.log("Server response:", response.data);
      message.success("Form submitted successfully!");
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setCookie("jwt", response.data.token, 7);
      window.location.href = "/";
    } catch (error) {
      console.error("Error login user:", error);
    }
  };


  return (
    <div className="h-screen py-16">
      <div className="container mx-auto rounded-lg h-full">
        <div className="grid xl:grid-cols-2 gap-8 h-full">
          <div className="hidden xl:flex bg-gray-200 rounded-3xl h-full">
            <img
              src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cover"
              className="w-full h-full rounded-3xl object-cover"
            />
          </div>
          <div className="flex w-full h-full items-center justify-center">
            <div className="p-8 w-full">
              <div className="text-4xl mb-3 md:mb-5 font-[800]">Login</div>
              <div className="mb-4">Enter Your Details Below</div>
              <div className="">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Email"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Password"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      size="large" 
                    >
                      Log in
                    </Button>
                    <div className="mt-4">
                        Don't have an account? <a href="/signup">Sign Up</a>
                      </div>
                  </Form.Item>
                </Form>
              </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
