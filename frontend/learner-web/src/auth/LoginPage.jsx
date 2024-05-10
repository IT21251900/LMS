import React from "react";
import { Form, Input, Button , Space} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Handle login logic here
  };

  return (
    <div className="h-screen py-16">
      <div className="container mx-auto rounded-lg h-full">
        <div className="grid xl:grid-cols-2 gap-8 h-full">
          <div className="hidden xl:flex bg-gray-200 rounded-3xl h-full">
            {/* Image */}
            {/* Replace 'image.jpg' with your image */}
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
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Username"
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
