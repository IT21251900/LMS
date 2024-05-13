import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  CardBody,
  Input,
  Button,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { course_category } from "../../utils/dataArrays";
import Select from "react-select";

export const AddCourse = () => {

  const instructorId = localStorage.getItem("userId");

  const [courseDetails, setCourseDetails] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    credits: "",
    instructorId:instructorId,
    image: null,
  });

  const handleCategoryChange = (selectedOption) => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      category: selectedOption.value,
    }));
  };

  const handleInputChange = (e) => {
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
    try {
      const formData = new FormData();
      formData.append("file", courseDetails.image);
      formData.append("upload_preset", "hqur7gkf"); // replace "your_upload_preset" with your actual Cloudinary upload preset
      const response = await fetch("https://api.cloudinary.com/v1_1/dwdu9bel1/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.secure_url;

      // Add the imageUrl to courseDetails
      const courseDataWithImage = {
        ...courseDetails,
        image: imageUrl,
      };

      // Send the course data to your backend
      const courseResponse = await axios.post("http://localhost:4200/course/", courseDataWithImage);

      console.log("Course added:", courseResponse.data);
    } catch (error) {
      console.error("Error adding course:", error.response.data.error);
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
          className="font-inter font-bold tracking-wide mb-6"
          color="blue-gray"
        >
          Add New Course
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
                onChange={handleInputChange}
              />
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
                onChange={handleInputChange}
              />
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
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-between gap-10 mb-6">
            <div className="w-1/2">
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
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
            <Typography
                variant="small"
                color="blue-gray"
                className="mb-5 font-semibold"
              >
                Select Image
              </Typography>
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>

          <Button type="submit" color="blue" className="mb-6 mt-3">
            Add Course
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
