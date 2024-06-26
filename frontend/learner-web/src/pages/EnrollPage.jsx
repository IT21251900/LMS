import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Collapse, Progress, Select, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

function EnrollPage() {
  const { id } = useParams();
  const StudentId = localStorage.getItem("id");
  const [timeTableData, setTimeTableData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [enrollmentInfo, setEnrollmentInfo] = useState(null); // State to store enrollment info
  const [enrolling, setEnrolling] = useState(false); // State to manage enrolling status
  const [progress, setProgress] = useState(0); // State to manage progress bar

  useEffect(() => {
    if (selectedDay) {
      axios
        .get(
          `http://localhost:4200/learner/auth/${StudentId}/time-slots/${selectedDay}`
        )
        .then((response) => {
          setTimeSlots(response.data.availableTimeSlots);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDay]);

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const handleTimeSlotChange = (value) => {
    setSelectedTimeSlot(value);
  };

  const handleEnroll = async () => {
    const selectedSlot = timeSlots.find(
      (slot) => slot._id === selectedTimeSlot
    );

    const enrollmentPayload = {
      courseIds: [id],
      selectedDate: selectedDay,
      selectedTimeSlots: [
        {
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          courseId: id,
        },
      ],
    };

    console.log("Enrollment Payload:", enrollmentPayload); // Logging the payload

    setEnrolling(true); // Set enrolling status to true

    try {
      const response = await axios.post(
        `http://localhost:4200/learner/auth/${StudentId}/enroll`,
        enrollmentPayload
      );
      console.log("Server response:", response.data);
      console.log(response.data.message);
      message.success("Enrolled successfully");
      message.success("Confirmation Email sent successfully");
      message.success("Confirmation SMS sent successfully");

      setTimeout(() => {
        window.location.href = `/view-courses/${id}`;
      }, 5000);
    } catch (error) {
      message.error("Failed to enroll user", error.message);
      console.error("Error Enrolling user:", error.message);
    }

    setEnrollmentInfo(enrollmentPayload);
  };

  // Update progress bar when enrolling
  useEffect(() => {
    let interval;
    if (enrolling) {
      interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 20
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [enrolling]);

  return (
    <div>
      <div
        className="banner w-full h-[300px] bg-black object-cover bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1665289420709-de6afce8d0a8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="container flex flex-row items-center h-full">
          <div className="flex gap-3 flex-col">
            <h1 className="text-white text-4xl font-bold">
              Enrollment Information
            </h1>
            <h2 className="text-white">Schedule your course</h2>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <Select
          placeholder="Select a day"
          style={{ width: 200 }}
          onChange={handleDayChange}
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <Option key={day} value={day}>
              {day}
            </Option>
          ))}
        </Select>
        {selectedDay && (
          <Select
            placeholder="Select a time slot"
            style={{ width: 200, marginLeft: 10 }}
            onChange={handleTimeSlotChange}
          >
            {timeSlots.map((slot) => (
              <Option key={slot._id} value={slot._id}>{`${slot.startTime} - ${slot.endTime}`}</Option>
            ))}
          </Select>
        )}
        {selectedTimeSlot && selectedDay && (
          <div className="flex flex-col gap-5 mt-5">
            {/* <p>
              You have selected {selectedTimeSlot} of {selectedDay} <br />
              User ID: {StudentId}
              <br />
              Course ID: {id}
            </p> */}
            <Button type="primary" className="w-fit" onClick={handleEnroll}>
              Enroll
            </Button>
          </div>
        )}
        {enrolling && (
          <div className="mt-5">
            <Progress percent={progress} />
          </div>
        )}
        {/* {enrollmentInfo && (
          <div className="mt-5">
            <h3>Enrollment Information:</h3>
            <p>
              Selected Date: {enrollmentInfo.selectedDate} <br />
              Start Time: {enrollmentInfo.startTime} <br />
              End Time: {enrollmentInfo.endTime} <br />
              User ID: {enrollmentInfo.StudentId} <br />
              Course ID: {enrollmentInfo.courseId}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default EnrollPage;

