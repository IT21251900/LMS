import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const location = useLocation();
  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  const userImage = localStorage.getItem("userImage");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("userImage");
    window.location.href = "/login";
  };

  return (
    <header className="">
      <div className="container mx-auto flex justify-between items-center my-1">
        <Link to="/" className="flex items-center">
          <img
            src="/img/logo/logo.png"
            alt="Logo"
            className="w-auto h-8 mr-2"
          />
        </Link>
        {firstname ? (
          <div className="flex flex-row items-center gap-2">
            <Link to="/profile">
              <div className="p-1 rounded-full border border-gray-200 ">
                <img
                  src={userImage}
                  alt="User"
                  className="w-8 h-8 rounded-full object-contain "
                />
              </div>
            </Link>

            <span className="hidden md:flex">
              {`${firstname.charAt(0).toUpperCase()}${firstname
                .slice(1)
                .toLowerCase()} ${lastname.charAt(0).toUpperCase()}${lastname
                .slice(1)
                .toLowerCase()}`}
            </span>

            <div
              className="flex items-center justify-center p-3 rounded-md border border-gray-200 hover:bg-red-300 cursor-pointer"
              onClick={logout}
            >
              <LogoutOutlined size="large" />
            </div>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link to="/login">
              <Button type="outline" size="large">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button type="primary" size="large" className="mr-2">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="bg-gray-800">
        <nav className="container mx-auto py-1 text-gray-50 min-h-[44px]">
          <ul className="flex navbar">
            <li className="mr-4">
              <Link
                to="/"
                className={`font-[100] hover:font-[400] ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className="mr-4">
              <Link
                to="/courses"
                className={`font-[100] hover:font-[400] ${
                  location.pathname === "/courses" ? "active" : ""
                }`}
              >
                Courses
              </Link>
            </li>
            {firstname ? (
              <div className="flex flex-row gap-2">
                <li className="mr-4">
                  <Link
                    to="/my-courses"
                    className={`font-[100] hover:font-[400] ${
                      location.pathname === "/my-courses" ? "active" : ""
                    }`}
                  >
                    My Courses
                  </Link>
                </li>
                <li className="mr-4">
                  <Link
                    to="/notification"
                    className={`font-[100] hover:font-[400] ${
                      location.pathname === "/my-courses" ? "active" : ""
                    }`}
                  >
                    Notifications
                  </Link>
                </li>
              </div>
            ) : (
              ""
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
