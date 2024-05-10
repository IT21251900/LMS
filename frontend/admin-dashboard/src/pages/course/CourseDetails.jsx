import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";

export const CourseDetails = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const instructorId = "1";

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/api/course/${id}`);
        setCourseDetails(response.data.data.course);
        setShowUpdateButton(response.data.data.course.instructorId === instructorId);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchHandler();
  }, [id, instructorId]);

  return (
    <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
      <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
        <p>Name: {courseDetails.name}</p>
        <p>Description: {courseDetails.description}</p>
        <p>
          <img
            src={`/uploads/${courseDetails.image}`}
            alt="ss"
            style={{ width: "380px", height: "360px" }}
            className="img"
          />
        </p>

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
      </CardBody>
    </Card>
  );
};
