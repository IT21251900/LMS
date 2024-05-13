import React, { useState, useEffect } from "react";
import { BookOpen, CircleUser, Star } from "lucide-react";
import axios from "axios";
const Courses = () => {

  const [courses, setCourse] = useState([]);

  const handleSingleCourse = (courseId) => {
    const StudentId = localStorage.getItem("id");
      window.location.href = `/courses/${courseId}`;
  }
  useEffect(() => {
    const fetchCourses = () => {
      axios
        .get(`http://localhost:4200/course/approved`) 
        .then((res) => {
          setCourse(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCourses(); 

  }, []);

  console.log(courses);

  return (
    <div>
      <div className="">
        <div
          className="banner w-full h-[300px] bg-black object-cover bg-center bg-no-repeat bg-cover relative"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1665289420709-de6afce8d0a8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
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
        {courses.data?.map((course) => (
          <div key={course.id} className="card-container">
          <div className="card rounded-2xl p-3 border border-slate-100 cursor-pointer hover:scale-up" onClick={() => handleSingleCourse(course._id)}>
            <img
              src={course.image}
              className="h-[200px] w-full object-cover rounded-md"
              alt="Course Thumbnail"
            />
            <div className="flex flex-col mt-5">
              <div className="flex flex-row w-full justify-between">
                <p className="text-[0.875rem] text-accent">{course.instructorId}</p>
                <div className="flex flex-row gap-2 items-center">
                  <Star size={16} color="#FFA621" />
                  <p className="text-[0.875rem] text-accent">{course.credits}</p>
                </div>
              </div>
              <h2 className="font-[500] mt-2 text-[1.2rem]">{course.name}</h2>
              <div className="flex justify-between items-end w-full flex-row">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <BookOpen size={16} color="gray" />
                    <p className="text-[0.875rem] text-accent">{course.lessonCount}</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <CircleUser size={16} color="gray" />
                    <p className="text-[0.875rem] text-accent">{course.enrollUserCount}</p>
                  </div>
                </div>
                <p className=" text-[1.5rem] text-primary">${course.price}</p>
              </div>
            </div>
          </div>
        </div>
        
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
