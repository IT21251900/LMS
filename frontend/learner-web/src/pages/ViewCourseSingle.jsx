import React from "react";
import { useParams } from "react-router-dom";
import { Button, Collapse, Progress } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const ViewCourseSingle = () => {
  const { id } = useParams();

  const course = {
    instructor: "John Doe",
    credits: 5,
    courseName: "Introduction to React",
    noOfLessons: 3,
    users: 150,
    imageUrl:
      "https://www.classcentral.com/report/wp-content/uploads/2020/06/top-100-course-pandemic.png",
    description:
      "This comprehensive course provides an in-depth introduction to React programming. It covers everything from the basics of setting up a React development environment to advanced topics such as state management with Redux and React Hooks. Throughout the course, you'll build several real-world projects to reinforce your learning and gain practical experience. Whether you're a complete beginner or an experienced developer looking to enhance your skills, this course has something for everyone.",
    lessons: [
      {
        title: "Lesson 1: Getting Started with React",
        content:
          "In this lesson, we'll cover the basics of React, including how to set up a development environment and create your first React component.",
        viewed: true,
      },
      {
        title: "Lesson 2: Understanding Components",
        content:
          "This lesson dives deeper into React components, explaining how to create functional and class components, and the difference between them.",
        viewed: false,
      },
      {
        title: "Lesson 3: State and Props",
        content:
          "Here, we'll explore React's state and props systems, understanding how to manage component state and pass data between components using props.",
        viewed: false,
      },
    ],
  };

  const markAsComplete = (lessonIndex) => {
    const updatedLessons = [...course.lessons];
    updatedLessons[lessonIndex].viewed = true;
    // Update state or perform any other action to update lesson status
  };

  const progress =
    (course.lessons.filter((lesson) => lesson.viewed).length /
      course.noOfLessons) *
    100;

  return (
    <div>
      <div className="container py-16">
        <div className="flex flex-row justify-between my-4 items-center">
          <h2 className="text-[3rem] font-[500]">{course.courseName}</h2>
          <div className="flex flex-row justify-between my-4 items-center">
          <p className="text-accent mr-5">{`Completed ${
              course.lessons.filter((lesson) => lesson.viewed).length
            } out of ${course.lessons.length}`}</p>
            <Progress
              type="circle"
              percent={Math.round(progress * 10) / 10}
              width={50}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3">
            <div className="my-8">
              <p className="text-accent text-[1.2rem] font-[100]">
                {course.description}
              </p>
            </div>
            <div className="my-8">
              <h3 className="text-[1.5rem] font-[500] mb-4">Course Lessons</h3>
              <Collapse accordion>
                {course.lessons.map((lesson, index) => (
                  <Collapse.Panel
                    header={lesson.title}
                    key={index}
                    extra={
                      lesson.viewed ? (
                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                      ) : (
                        <Button onClick={() => markAsComplete(index)}>
                          Mark as Complete
                        </Button>
                      )
                    }
                  >
                    <div className="p-4 rounded-md">
                      <p className="text-accent">{lesson.content}</p>
                    </div>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </div>
          </div>
          <div className="col-span-1 border border-gray-100 rounded-3xl p-4 h-fit">
            <img
              src={course.imageUrl}
              className="w-full h-auto object-cover rounded-2xl "
              alt="Course"
            />
            <div className="flex justify-between items-center w-full mt-4">
              <p className="text-accent text-[.87rem]">Instructor</p>
              <p className="text-accent text-[.87rem]">{course.instructor}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent text-[.87rem]">No. of Credits</p>
              <p className="text-accent text-[.87rem]">{course.credits}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent text-[.87rem]">No.of Enrolled Students </p>
              <p className="text-accent text-[.87rem]">{course.users}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent text-[.87rem]">No.of Lessons </p>
              <p className="text-accent text-[.87rem]">{course.noOfLessons}</p>
            </div>
            <div className="flex flex-row justify-end mt-5">
              <Button type="primary" color="red">
                Unenroll
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseSingle;
