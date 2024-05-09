// pages/SignUpPage.jsx
import React, { useState } from "react";
import { Steps, Button, Form, Upload, Input, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const SignUpPage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Personal Info",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="First Name"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Last Name"
              size="large"
            />
          </Form.Item>
        </Space>
      ),
    },
    {
      title: "Contact Info",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            rules={[
              { required: true, message: "Please input your contact number!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              type="tel"
              placeholder="Contact Number"
              size="large"
            />
          </Form.Item>
        </Space>
      ),
    },
    {
      title: "Password",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>
        </Space>
      ),
    },
    {
      title: "Profile Photo",
      content: (
        <Form.Item name="file" valuePropName="file">
          <Upload >
            <Button icon={<UploadOutlined />} size="large">
              Upload File
            </Button>
          </Upload>
        </Form.Item>
      ),
    },
  ];

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <div className="h-screen py-16">
      <div className="container mx-auto rounded-lg h-full">
        <div className="md:grid md:grid-cols-2 gap-8 h-full">
          <div className="hidden md:flex bg-gray-200 rounded-3xl h-full">
            {/* Image */}
            {/* Replace 'image.jpg' with your image */}
            <img
              src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cover"
              className="w-full h-full rounded-3xl object-cover"
            />
          </div>
          <div className="container mx-auto rounded-lg h-full flex items-center md:justify-center min-w-[300px] p-8">
            <div className="">
              <div className="text-4xl mb-3 md:mb-5 font-[800]">Sign Up</div>
              <div className="mb-8 md:mb-16">Enter Your Details Below</div>
              <div className="hidden md:flex">
                <Steps current={current}>
                  {steps.map((item) => (
                    <Step
                      key={item.title}
                      title={item.title}
                    />
                  ))}
                </Steps>
              </div>
              <div className="w-full h-[2px] bg-slate-100 mt-5"></div>
              <div className="steps-content mt-8 md:min-h-[200px]">
                {steps[current].content}
              </div>
              <div className="steps-action">
                {current > 0 && (
                  <Button  size="large" style={{ margin: "0 8px 0 0" }} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" size="large" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary"  size="large" onClick={() => form.submit()}>
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
