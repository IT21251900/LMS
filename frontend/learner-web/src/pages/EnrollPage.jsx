import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Collapse, Progress, Select } from "antd";
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

  useEffect(() => {
    if (selectedDay) {
      axios
        .get(
          `http://localhost:4200/learner/auth/663f08c54b6e4661690ad0a9/time-slots/${selectedDay}`
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
              <Option
                key={slot._id}
                value={slot._id}
              >{`${slot.startTime} - ${slot.endTime}`}</Option>
            ))}
          </Select>
        )}
        {selectedTimeSlot && selectedDay && (
          <div className="flex flex-col gap-5 mt-5">
            <p>
              you have selected {selectedTimeSlot} of {selectedDay} <br></br>
              userid : {StudentId}<br></br>
              courseid : {id}
            </p>
            <Button type="primary" className="w-fit">
              Enroll
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrollPage;
