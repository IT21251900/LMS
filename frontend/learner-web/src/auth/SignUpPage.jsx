import React, { useState } from "react";
import { Steps, Button, Form, Upload, Input, Space, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { CloudinaryContext, Image } from "cloudinary-react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Step } = Steps;

const SignUpPage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [formData1, setFormData1] = useState({});
  const [image, setImage] = useState(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleChange = (changedValues) => {
    setFormData1((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "hqur7gkf");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dwdu9bel1/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const imageUrl = data.secure_url;
        formData1.userImage = imageUrl;
        console.log("Image URL:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:4200/learner/auth/register",
        formData1
      );
      console.log("Form values:", formData1);
      console.log("Server response:", response.data);
      message.success("Form submitted successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const steps = [
    {
      title: "Personal Info",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="First Name"
              size="large"
              onChange={(e) => handleChange({ firstname: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Last Name"
              size="large"
              onChange={(e) => handleChange({ lastname: e.target.value })}
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
              onChange={(e) => handleChange({ email: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your contact number!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              type="tel"
              placeholder="Contact Number"
              size="large"
              onChange={(e) => handleChange({ phone: e.target.value })}
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
              onChange={(e) => handleChange({ password: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
              onChange={(e) =>
                handleChange({ confirmPassword: e.target.value })
              }
            />
          </Form.Item>
        </Space>
      ),
    },
    {
      title: "Profile Photo",
      content: (
        <div className="">
          <Form.Item name="file">
            <Input type="file" onChange={handleFileChange} />
          </Form.Item>
          {image && (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="rounded-full h-20 w-20 object-contain mt-[10px] border border-gray-100"
              />
            </div>
          )}
        </div>
        // <Form.Item name="file" valuePropName="file">
        //   <Upload>
        //     <Button icon={<UploadOutlined />} size="large">
        //       Upload File
        //     </Button>
        //   </Upload>
        // </Form.Item>
      ),
    },
  ];

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
          <div className="container mx-auto rounded-lg h-full flex items-center md:justify-center min-w-[300px] p-8">
            <div className="">
              <div className="text-4xl mb-3 md:mb-5 font-[800]">Sign Up</div>
              <div className="mb-8 md:mb-16">Enter Your Details Below</div>
              <div className="hidden md:flex">
                <Steps current={current}>
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
              </div>
              <div className="w-full h-[2px] bg-slate-100 mt-5"></div>
              <div className="steps-content mt-8 md:min-h-[200px]">
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  layout="vertical"
                  initialValues={{ remember: true }}
                >
                  {steps[current].content}
                </Form>
              </div>
              <div className="steps-action">
                {current > 0 && (
                  <Button
                    size="large"
                    style={{ margin: "0 8px 0 0" }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" size="large" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => form.submit()}
                  >
                    Submit
                  </Button>
                )}
              </div>
              <div className="mt-4 font-[100]">
                Already have an account? <a href="/login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
