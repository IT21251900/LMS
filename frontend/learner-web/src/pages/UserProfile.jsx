import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const StudentId = localStorage.getItem("id");
  if (!StudentId) {
    window.location.href = "/login";
  } else {
    useEffect(() => {
      axios
        .get(`http://localhost:4200/learner/auth/${StudentId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

  const handleSingleCourse = (courseId) => {
      window.location.href = `/view-courses/${courseId}`;
  }

  console.log(userData);

  if (userData) {
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
              <h1 className="text-white text-4xl font-bold">My Profile</h1>
              <h2 className="text-white">
                Hello{" "}
                {`${userData.firstname
                  .charAt(0)
                  .toUpperCase()}${userData.firstname.slice(1).toLowerCase()}`}
                , Welcome Back!
              </h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="grid grid-cols-4">
            <div className="col-span-2 flex flex-row gap-5 p-5 rounded-3xl border border-gray-200 items-center">
              <div className="w-32 h-32 rounded-full border border-gray-200 p-4">
                <img
                  src={userData.userImage}
                  className="w-full h-full object-contain rounded-full"
                  alt="User Image"
                />
              </div>
              <div className="h-full w-[2px] bg-slate-300"></div>
              <div className="flex flex-col gap-2">
                <h1 className="mb-3">Account Information</h1>
                <h1 className="text-accent">
                  {`${userData.firstname
                    .charAt(0)
                    .toUpperCase()}${userData.firstname
                    .slice(1)
                    .toLowerCase()}`}{" "}
                  {`${userData.lastname
                    .charAt(0)
                    .toUpperCase()}${userData.lastname.slice(1).toLowerCase()}`}
                </h1>
                <p className="text-accent">Email: {userData.email}</p>
                <p className="text-accent">Phone: {userData.phone}</p>
              </div>
            </div>
            <div className=""></div>
            <div className="col-span-4">
              <h1 className="mb-3 text-[1.5rem] pt-8 pb-4 font-[500]">Your Weekly Schedule</h1>
              <div className="">
                
              </div>
              <table className="table-auto border border-gray-400 rounded-3xl">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Day</th>
                    <th className="border border-gray-400 px-4 py-2">
                      Time Slots
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.TimeTableSessions.map((session) => (
                    <tr key={session._id} className="bg-white">
                      <td className="border border-gray-400 px-4 py-2">
                        {session.day}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <table>
                          <tbody>
                            <tr>
                              {session.timeSlots.map((slot) => (
                                <td key={slot._id} className="px-2 py-2">
                                  <div
                                    key={slot._id}
                                    style={{
                                      background: slot.isAvailable
                                        ? "#41B06E"
                                        : "#4096ff",
                                    }}
                                    className={` text-white px-2 py-2 rounded-lg text-center`}
                                  >
                                    {slot.startTime} - {slot.endTime}
                                    {slot.courseId && (
                                      <div
                                        href={`/courses/${slot.courseId}`}
                                        className="text-accent cursor-pointer hover:text-white"
                                        onClick={() => handleSingleCourse(slot.courseId)}
                                      >
                                        View Course
                                      </div>
                                    )}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default UserProfile;
