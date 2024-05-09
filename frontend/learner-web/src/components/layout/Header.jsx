import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Learning Management System</h1>
        <nav className="mt-4">
          <ul className="flex">
            <li className="mr-4">
              <Link to="/">Home</Link>
            </li>
            <li className="mr-4">
              <Link to="/courses">Courses</Link>
            </li>
            <li className="mr-4">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="mr-4">
              <Link to="/login">Login</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;