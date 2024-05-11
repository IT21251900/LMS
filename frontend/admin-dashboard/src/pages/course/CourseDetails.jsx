import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Button,
  Typography
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { LessonContent } from "./LessonContent";
import { useNavigate, Link } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


export const CourseDetails = () => {
  const { id } = useParams();

  const [openAccordion, setOpenAccordion] = useState({});

  const handleOpen = (index) => {
    setOpenAccordion((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const [courseDetails, setCourseDetails] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const role = "admin1";

  const instructorId = "1";

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/course/${id}`);
        setCourseDetails(response.data.data);
        setShowUpdateButton(response.data.data.course.instructorId === instructorId);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchHandler();
  }, [id, instructorId]);

  console.log(courseDetails);

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
    // <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
    //   <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
    //     <p>Name: {courseDetails.course?.name}</p>
    //     <p>Description: {courseDetails.course?.description}</p>
    //     <p>
    //       <img
    //         src={`/uploads/${courseDetails.course?.image}`}
    //         alt="ss"
    //         className="img"
    //       />
    //     </p>
    //     {showUpdateButton && (
    //       <a
    //         href={`/edit-courses/${courseDetails.course._id}`}
    //         className="hidden md:flex w-fit gap-1 items-center p-1 px-3 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
    //       >
    //         <span>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 20 20"
    //             fill="currentColor"
    //             className="w-5 h-5"
    //           >
    //             <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    //           </svg>
    //         </span>
    //         <span>Update Course</span>
    //       </a>
    //     )}

    //     <div>
    //       <h3>Lessons:</h3>
    //       <ul>
    //         {courseDetails.lessons &&
    //           courseDetails.lessons.map((lesson) => (
    //             <div>
    //               <li key={lesson._id} className="font-bold">{lesson.title}</li>
    //               <LessonContent id={lesson._id}/>
    //             </div>
    //           ))}
    //       </ul>
    //     </div>
    //   </CardBody>
    // </Card>

    <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
      <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
      <div className="flex justify-between w-full  pb-8">
          <div>
          <Typography
            variant="h4"
            className="font-inter font-bold tracking-wide"
            color="blue-gray"
          >
           {courseDetails.course?.name}
          </Typography>
          </div>
          <div className="flex gap-3">  
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
      <div>
        <div className="flex justify-between">
<div className="w-[70%] pr-5">
<p className="text-accent text-[15px] font-[50]">{courseDetails.course?.description}</p>
</div>
<div className="w-[30%]">
<img
               src={`/uploads/${courseDetails.course?.image}`}
              className="w-full h-auto object-cover rounded-3xl "
              alt="Course"
            />
</div>
        </div>
      <div className="container">
        <div>
          <div className="md:col-span-3">
          
            <div className="my-8">
             
            </div>
            <div className="my-8">
              <h3 className="text-[1.5rem] font-[500] mb-4">Course Lessons</h3>
              <ul>
              {courseDetails.lessons &&
              courseDetails.lessons.map((lesson, index) => (
                <div key={lesson._id}>
                  <Accordion
                    open={openAccordion[index]}
                    className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(index)}
                      className={`border-b-0 transition-colors ${
                        openAccordion[index]
                          ? "text-[#6F6F6F] text-[17px]"
                          : "text-[#6F6F6F] text-[17px]"
                      }`}
                    >
                      {lesson.title}
                    </AccordionHeader>
                    <AccordionBody className="pt-0 text-base font-normal">
                      <LessonContent id={lesson._id} />
                    </AccordionBody>
                  </Accordion>
                </div>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      </CardBody>
    </Card>
    
  );
};
