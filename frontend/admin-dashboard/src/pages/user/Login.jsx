import React, { useState } from "react";
import BackgroundImage from "../../assets/images/login-bg.png"; // Import your background image
import { useNavigate } from "react-router-dom";

function Login() {
  // Define state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Event handler for email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any necessary validation or send the email and password to your backend for authentication
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset the form after submission
    setEmail("");
    setPassword("");

    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        width: "100vw",
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Login Here!</h1>
        <div className="p-5 bg-blue-500 bg-opacity-75 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-75 shadow-md rounded-2xl p-8"
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-2xl w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-2xl w-full py-3 px-4 text-lg text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl focus:outline-none focus:shadow-outline"
                type="submit" // Change button type to submit
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
