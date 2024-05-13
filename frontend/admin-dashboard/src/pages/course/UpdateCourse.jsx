import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  CardBody,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { course_category } from "../../utils/dataArrays";
import Select from "react-select";
import { message } from "antd";

export const UpdateCourse = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/course/${id}`);
        setCourseDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleCategoryChange = (selectedOption) => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      category: selectedOption.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    // Field validation
    if (!courseDetails.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (!courseDetails.name) {
      newErrors.name = "Course Name is required";
      isValid = false;
    }
    if (!courseDetails.credits) {
      newErrors.credits = "Credit is required";
      isValid = false;
    }
    if (!courseDetails.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    if (!courseDetails.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:4200/course/${id}`, courseDetails);
      console.log("Course updated successfully!");
      message.success("Course updated successfully");
      navigate("/my-courses");
    } catch (error) {
      console.error("Error updating course:", error);
      message.error("Error updating course");
    }
  };

  const options = course_category.map((category) => ({
    value: category.key,
    label: category.key,
  }));

  return (
    <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
      <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
        <Typography
          variant="h4"
          className="font-inter font-bold tracking-wide"
          color="blue-gray"
        >
          Update Course - {courseDetails.name}
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-10 mb-6">
            <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Select Category
              </Typography>
              <Select
                options={options}
                value={options.find(
                  (option) => option.value === courseDetails.category
                )}
                onChange={handleCategoryChange}
              />
              {errors.category && (
                <Typography variant="p" color="red" className="text-xs">
                  {errors.category}
                </Typography>
              )}
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
                value={courseDetails.name}
                onChange={handleChange}
              />
              {errors.name && (
                <Typography variant="p" color="red" className="text-xs">
                  {errors.name}
                </Typography>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-10 mb-6">
            <div className="w-1/2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Credit
              </Typography>
              <Input
                type="text"
                name="credits"
                value={courseDetails.credits}
                onChange={handleChange}
              />
              {errors.credits && (
                <Typography variant="p" color="red" className="text-xs">
                  {errors.credits}
                </Typography>
              )}
            </div>
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
                value={courseDetails.price}
                onChange={handleChange}
              />
              {errors.price && (
                <Typography variant="p" color="red" className="text-xs">
                  {errors.price}
                </Typography>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-10 mb-6">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Description
              </Typography>
              <Textarea
                name="description"
                value={courseDetails.description}
                onChange={handleChange}
              />
              {errors.description && (
                <Typography variant="p" color="red" className="text-xs">
                  {errors.description}
                </Typography>
              )}
            </div>
          </div>
          <div>
            <Button color="blue" type="submit">
              Update Course
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
