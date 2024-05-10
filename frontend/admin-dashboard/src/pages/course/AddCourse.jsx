import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const AddCourse = () => {
  const [courseDetails, setCourseDetails] = useState({
    category: "",
    name: "",
    description: "",
    price:"",
    credits: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", courseDetails.category);
    formData.append("name", courseDetails.name);
    formData.append("description", courseDetails.description);
    formData.append("price", courseDetails.price);
    formData.append("credits", courseDetails.credits);
    formData.append("image", courseDetails.image);
    formData.append("instructorId", "1"); // Set instructorId as 1

    try {
      const response = await axios.post("http://localhost:4200/api/course/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Course added:", response.data);
      // Optionally, redirect to another page after successful submission
    } catch (error) {
      console.error("Error adding course:", error.response.data.error);
    }
  };

  return (
    <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
      <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
        <Typography
          variant="h4"
          className="font-inter font-bold tracking-wide"
          color="blue-gray"
        >
          Add New Course
        </Typography>

        <form onSubmit={handleSubmit}>
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
                value={courseDetails.category}
                onChange={handleChange}
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
                value={courseDetails.name}
                onChange={handleChange}
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
                value={courseDetails.description}
                onChange={handleChange}
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
                value={courseDetails.credits}
                onChange={handleChange}
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
                Select Image
              </Typography>
              <input type="file" onChange={handleImageChange} />
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
            </div>
          </div>

          <Button type="submit" color="blue">
            Add Course
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
