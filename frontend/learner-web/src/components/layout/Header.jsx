import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
const Header = () => {
  const location = useLocation();

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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
