import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const UpdateCourse = () => {

    const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/course/${id}`);
        setCourseDetails(response.data.data.course);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchHandler();
  }, [id]);
  return (
    <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
      <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
        <Typography
          variant="h4"
          className="font-inter font-bold tracking-wide"
          color="blue-gray"
        >
          Update New Course {courseDetails._id}
        </Typography>

        <form>
          <div className="flex justify-between gap-10">
            <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Select Category
              </Typography>
              <Input
                type="text"
                name="category"
              />
            </div>
            <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Course Name
              </Typography>
              <Input
                type="text"
                name="name"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Description
              </Typography>
              <Input
                type="text"
                name="description"
              />
            </div>
            <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Credits
              </Typography>
              <Input
                type="text"
                name="credits"
              />
            </div>
          </div>

          <div className="flex justify-between gap-10">
            <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Price
              </Typography>
              <Input
                type="text"
                name="price"
              />
            </div>
          </div>

          <Button type="submit" color="blue">
            Add Course
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
