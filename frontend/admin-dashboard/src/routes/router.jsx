import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { Course } from "../pages/course/Course";
import Login from "../pages/user/Login";
import User from "../pages/user/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        // element: <Dashboard />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    // element: <SignUp />,
  },
]);

export default router;
