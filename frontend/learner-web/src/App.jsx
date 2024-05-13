import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./auth/LoginPage";
import SignUpPage from "./auth/SignUpPage";
import HomePage from "./pages/HomePage";
import Courses from "./pages/Courses";
import CourseSingle from "./pages/CourseSingle";
import ViewCourseSingle from "./pages/ViewCourseSingle";
import PaymentPage from "./pages/payment/PaymentPage";
import UserProfile from "./pages/UserProfile";
import EnrollPage from "./pages/EnrollPage";
import MyCourses from "./pages/MyCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/courses/:id" element={<CourseSingle />} />
          <Route path="/view-courses/:id" element={<ViewCourseSingle />} />
          <Route path="/enroll/:id" element={<EnrollPage />} />
          <Route path="/payment/:id/:price" element={<PaymentPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
