import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { Course } from "../pages/course/Course";
import { AddCourse } from "../pages/course/AddCourse";
import { CourseDetails } from "../pages/course/CourseDetails";
import { MyCourses } from "../pages/course/MyCourses";
import { UpdateCourse } from "../pages/course/UpdateCourse";
import Login from "../pages/user/Login";
import User from "../pages/user/User";
import Payment from "../pages/payment/Payment";
import PendingCourse from "../pages/course/PendingCourse";

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
      {
        path: "/add-new-course",
        element: <AddCourse />,
      },
      {
        path: "/course-details/:id",
        element: <CourseDetails />,
      },
      {
        path: "/my-courses",
        element: <MyCourses />,
      },
      {
        path: "/edit-courses/:id",
        element: <UpdateCourse />,
      },
      {
        path: "/pending-course",
        element: <PendingCourse />,
      },
      {
        path: "/payment",
        element: <Payment />,
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
