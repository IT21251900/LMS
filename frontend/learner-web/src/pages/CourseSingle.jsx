import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";

const CourseSingle = () => {
  const { id } = useParams();

  const course = {
    instructor: "John Doe",
    credits: 5,
    courseName: "Introduction to React",
    books: 10,
    users: 150,
    price: 49.99,
    imageUrl:
      "https://www.classcentral.com/report/wp-content/uploads/2020/06/top-100-course-pandemic.png",
    description:
      "This comprehensive course provides an in-depth introduction to React programming. It covers everything from the basics of setting up a React development environment to advanced topics such as state management with Redux and React Hooks. Throughout the course, you'll build several real-world projects to reinforce your learning and gain practical experience. Whether you're a complete beginner or an experienced developer looking to enhance your skills, this course has something for everyone.",
    lessons: [
      { title: "Lesson 1: Getting Started with React" },
      { title: "Lesson 2: Understanding Components" },
      { title: "Lesson 3: State and Props" },
      // Add more lessons as needed
    ],
  };

  return (
    <div>
      <div className="container py-16">
        <div className="flex flex-row justify-between my-4 items-center">
          <h2 className="text-[3rem] font-[500]">{course.courseName}</h2>
          <div className="flex flex-row justify-between my-4 items-center">
            <Button type="primary" size="large">
              Enroll Now
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3">
            <img
              src={course.imageUrl}
              className="w-full h-auto object-cover rounded-3xl "
              alt="Course"
            />
            <div className="my-8">
              <p className="text-accent text-[1.2rem] font-[100]">{course.description}</p>
            </div>
            <div className="my-8">
              <h3 className="text-[1.5rem] font-[500] mb-4">Course Lessons</h3>
              <ul>
                {course.lessons.map((lesson, index) => (
                  <div className="p-4 border border-slate-100 rounded-md mb-5">
                    <li key={index} className="text-accent">
                      {lesson.title}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-1 border border-gray-100 rounded-3xl p-8 h-fit">
            <div className="flex justify-between items-center w-full">
              <p className="text-accent">Instructor</p>
              <p className="text-accent">{course.instructor}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent">No. of Credits</p>
              <p className="text-accent">{course.credits}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent">No.of Enrolled Students </p>
              <p className="text-accent">{course.users}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent">No.of Lessons </p>
              <p className="text-accent">{course.books}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent">Price</p>
              <p className="text-primary text-[1.5rem]">${course.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSingle;
