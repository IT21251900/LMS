import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Button,
  Input,
  Typography,
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
      [index]: !prevState[index],
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
        console.log("id", response.data.data);
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
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4200/course/lessons/${id}`,
        {
          title: lessonTitle,
        }
      );
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        lessons: [...prevDetails.lessons, response.data.data],
      }));
      setShowAddLessonForm(false);
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

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
                className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-3 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </span>
                <span>Delete Course</span>
              </button>
            )}

            {showUpdateButton && (
              <a
                href={`/edit-courses/${courseDetails._id}`}
                className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-3 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </span>
                <span>Update Course</span>
              </a>
            )}
          </div>
          <div className="flex md:hidden justify-center items-center">
            <Link className="md:w-fit rounded-[50%] w-[40px] md:mt-0 md:hidden flex p-2 gap-2 items-center font-inter font-medium bg-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] md:text-[16px] transition-colors duration-500">
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
            <div className="w-[70%] pr-5 ">
              <p className="text-accent text-[16px] font-[50] mt-5">
                {courseDetails?.description}
              </p>
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
                  <p className="text-accent text-[.87rem]">
                    {courseDetails.instructorId}
                  </p>
                </div>
                <div className="w-full h-[2px] bg-slate-100 my-4"></div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-accent text-[.87rem]">No. of Credits</p>
                  <p className="text-accent text-[.87rem]">
                    {courseDetails.credits}
                  </p>
                </div>
                <div className="w-full h-[2px] bg-slate-100 my-4"></div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-accent text-[.87rem]">
                    No.of Enrolled Students{" "}
                  </p>
                  <p className="text-accent text-[.87rem]">
                    {courseDetails.enrollUserCount}
                  </p>
                </div>
                <div className="w-full h-[2px] bg-slate-100 my-4"></div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-accent text-[.87rem]">No.of Lessons </p>
                  <p className="text-accent text-[.87rem]">
                    {courseDetails.lessonCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div>
              <div className="md:col-span-3">
                <div className="my-8"></div>
                <div className="my-8">
                  <h3 className="text-[1.5rem] font-[500] mb-4">
                    Course Lessons
                  </h3>

                  <button
                    onClick={() => setShowAddLessonForm(true)}
                    className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-3 my-10 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
                  >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                    Add Lessons
                  </button>
                  {showAddLessonForm && (
                    <form onSubmit={handleLessonSubmit}>
                      <div className="w-1/4">
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
                     <div className="flex gap-5 w-1/4 justify-end">
                     <button type="submit" className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-6 my-10 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500">
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddLessonForm(false)}
                        className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-3 my-10 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
                      >
                        Cancel
                      </button>
                     </div>
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
