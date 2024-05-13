import React, { useState, useEffect } from "react";
import { BookOpen, CircleUser, Star } from "lucide-react";
import { Button } from "antd";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState({});
  const studentId = localStorage.getItem("id");
  const myCourses = student.courses || [];

  const handleSingleCourse = (courseId) => {
    window.location.href = `/view-courses/${courseId}`;
  };

  useEffect(() => {
    const fetchCourses = () => {
      axios
        .get(`http://localhost:4200/course/`)
        .then((res) => {
          setCourses(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStudent = () => {
      axios
        .get(`http://localhost:4200/learner/auth/${studentId}`)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchStudent();
  }, [studentId]);

  return (
    <div>
      <div className="">
        <div
          className="banner w-full h-[300px] bg-black object-cover bg-center bg-no-repeat bg-cover relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1665289420709-de6afce8d0a8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="container flex flex-row items-center h-full">
            <div className="flex gap-3 flex-col">
              <h1 className="text-white text-4xl font-bold">All Courses</h1>
              <h2 className="text-white">Expolore Our Collection</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {courses.data?.map((course) => {
            // Check if the course ID is present in myCourses array
            if (myCourses.includes(course._id)) {
              return (
                <div key={course._id} className="card-container">
                  <div
                    className="card rounded-2xl p-3 border border-slate-100 cursor-pointer hover:scale-up"
                    onClick={() => handleSingleCourse(course._id)}
                  >
                    <img
                      src={course.image}
                      className="h-[200px] w-full object-cover rounded-md"
                      alt="Course Thumbnail"
                    />
                    <div className="flex flex-col mt-5">
                      <div className="flex flex-row w-full justify-between">
                        <p className="text-[0.875rem] text-accent">
                          {course.instructorId}
                        </p>
                        <div className="flex flex-row gap-2 items-center">
                          <Star size={16} color="#FFA621" />
                          <p className="text-[0.875rem] text-accent">
                            {course.credits}
                          </p>
                        </div>
                      </div>
                      <h2 className="font-[500] mt-2 text-[1.2rem]">
                        {course.name}
                      </h2>
                      <div className="flex justify-between items-end w-full flex-row">
                        <div className="flex flex-row gap-2">
                          <div className="flex flex-row gap-2 items-center">
                            <BookOpen size={16} color="gray" />
                            <p className="text-[0.875rem] text-accent">
                              {course.lessonCount}
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <CircleUser size={16} color="gray" />
                            <p className="text-[0.875rem] text-accent">
                              {course.enrollUserCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return(
                <div className="md:col-span-2 xl:col-span-3 2xl:col-span-4 mt-6">
                  <div className="flex flex-col gap-5 justify-center items-center w-full">
                  <h1>You have not enrolled in any courses yet</h1>
                  <Link
                to="/courses"
                className={`font-[100] hover:font-[400] ${
                  location.pathname === "/courses" ? "active" : ""
                }`}
              >
                <Button className="btn-primary" >Find Courses</Button>
              </Link> 
                  </div>
                </div>
              ); 
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
