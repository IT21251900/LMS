import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios directly
import {
  Card,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { CourseCard } from "./CourseCard";

export const Course = () => {

  const [course, setCourse] = useState([]);


  const role = "admin";

  useEffect(() => {
    const fetchCourses = () => {
      axios
        .get(`http://localhost:4200/course/`) 
        .then((res) => {
          setCourse(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCourses(); 

  }, []);

  console.log(course)

  return (
    <>
      <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
        <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
          <div className="flex justify-between w-full border-b-2 pb-3">
            <div>
            <Typography
              variant="h4"
              className="font-inter font-bold tracking-wide"
              color="blue-gray"
            >
              Courses
            </Typography>
            </div>
            <div className="flex gap-3">
           {role === "admin" && (
              <>
                <a
                  className="hidden md:flex w-fit gap-1 items-center p-1 px-3 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                  </span>
                  <span>Pending Courses</span>
                </a>
              </>
            )}
            <a href={`/my-courses`}
              className="hidden md:flex w-fit gap-1 items-center p-1 px-3 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
              </span>
              <span>My Courses</span>
            </a>
            <a href={`/add-new-course`}
              className="hidden md:flex w-fit gap-1 items-center p-1 px-3 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
              </span>
              <span>New Course</span>
            </a>
            </div>
            
            <div className="flex md:hidden justify-center items-center">
              <Link
                className="md:w-fit rounded-[50%] w-[40px] md:mt-0 md:hidden flex p-2 gap-2 items-center font-inter font-medium bg-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] md:text-[16px] transition-colors duration-500"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.data?.map((courseItem) => (
              <CourseCard key={courseItem.id} data={courseItem} />
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  )
}
