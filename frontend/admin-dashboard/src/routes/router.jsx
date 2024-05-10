import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { Course } from "../pages/course/Course";


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
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        // element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    // element: <SignUp />,
  },
]);

export default router;
