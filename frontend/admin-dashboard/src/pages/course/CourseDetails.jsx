import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Button,
  Input,
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
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");

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
        setShowUpdateButton(response.data.data.instructorId === instructorId);
        console.log("id",response.data.data)
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchHandler();
  }, [id, instructorId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4200/course/${id}`);
      console.log("Course deleted successfully!");
      // Optionally, you can redirect the user to another page after deletion
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };


  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4200/course/lessons/${id}`, {
        title: lessonTitle
      });
      // Update the course details with the new lesson
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        lessons: [...prevDetails.lessons, response.data.data]
      }));
      // Hide the lesson form after successful addition
      setShowAddLessonForm(false);
      // Optionally, you can display a success message
    } catch (error) {
      console.error("Error adding lesson:", error);
      // Optionally, you can display an error message to the user
    }
  };
  // console.log(courseDetails.instructorId);

  return (
    <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
      <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
      <div className="flex justify-between w-full  pb-8">
          <div>
          <Typography
            variant="h4"
            className="font-inter font-bold tracking-wide"
            color="blue-gray"
          >
           {courseDetails.name}
          </Typography>
          </div>
          <div className="flex gap-3">  
          {showUpdateButton && (
           <button 
           onClick={handleDelete}
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
            <span>Delete Course</span>
          </button>
       )}

          {showUpdateButton && (
           <a
           href={`/edit-courses/${courseDetails._id}`}
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
            <span>Update Course</span>
          </a>
       )}
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
<p className="text-accent text-[15px] font-[50]">{courseDetails?.description}</p>
</div>
<div className="w-[30%]">
            <div className="col-span-1 border border-gray-100 rounded-3xl p-4 h-fit">
            <img
              src={`${courseDetails?.image}`}
              className="w-full h-auto object-cover rounded-2xl "
              alt="Course"
            />
            <div className="flex justify-between items-center w-full mt-4">
              <p className="text-accent text-[.87rem]">Instructor</p>
              <p className="text-accent text-[.87rem]">{courseDetails.instructorId}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent text-[.87rem]">No. of Credits</p>
              <p className="text-accent text-[.87rem]">{courseDetails.credits}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent text-[.87rem]">No.of Enrolled Students </p>
              <p className="text-accent text-[.87rem]">{courseDetails.enrollUserCount}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-100 my-4"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-accent text-[.87rem]">No.of Lessons </p>
              <p className="text-accent text-[.87rem]">{courseDetails.lessonCount}</p>
            </div>
          </div>
</div>
        </div>
      <div className="container">
        <div>
          <div className="md:col-span-3">
          
            <div className="my-8">
             
            </div>
            <div className="my-8">
              <h3 className="text-[1.5rem] font-[500] mb-4">Course Lessons</h3>

              <button onClick={() => setShowAddLessonForm(true)}
              className="hidden md:flex w-fit gap-1 items-center p-1 px-3 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
              >Add Lessons</button>
                  {showAddLessonForm && (
                    <form onSubmit={handleLessonSubmit}>
                     <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Title
              </Typography>
              <Input
                type="text"
                name="title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
            </div>
            <Button type="submit" color="blue" className="mb-6 mt-3">
            Add
          </Button>
          <Button onClick={() => setShowAddLessonForm(false)} color="red" className="mb-6 mt-3">
            Cancel
          </Button>
                    </form>
                  )}
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
