import React, { useState } from "react";
import { UpdateUser } from "../service/UserService";

function UpdateUserForm({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [NIC, setNIC] = useState(user.NIC);
  const password = user.password;
  const [day, setDay] = useState(user.timeTable[0]?.day);
  const [slot, setSlot] = useState(user.timeTable[0]?.slot);
  const [courseId, setCourseId] = useState(user.course[0]?.courseId);
  const [course, setCourse] = useState(user.course[0]?.course);
  const [role, setRole] = useState(user.role);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const timeTable = [];
      timeTable.push({ day, slot });
      const courseArr = [];
      courseArr.push({ id: courseId, name: course });

      const updateUser = {
        name,
        email,
        NIC,
        password,
        timeTable,
        course: courseArr,
        role,
      };

      const res = await UpdateUser(user._id, updateUser);

      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="flex flex-row justify-around">
        <div className="mb-5 " style={{ width: "45%" }}>
          <label
            htmlFor="name"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-5 " style={{ width: "45%" }}>
          <label
            htmlFor="NIC"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            NIC
          </label>
          <input
            type="text"
            id="NIC"
            name="NIC"
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="NIC number"
            required
          />
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="mb-5 " style={{ width: "95%" }}>
          <label
            htmlFor="email"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        {/* <div className="mb-5" style={{ width: "45%" }}>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your password"
            disabled
          />
        </div> */}
      </div>

      {/* Add select input for role */}
      <div className="mb-5 mx-3">
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select your role
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="learner">Learner</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <h6 className="ms-3 mb-2 mt-3"> Time Table</h6>
      <div className="flex flex-row justify-around">
        <div className="mb-5" style={{ width: "45%" }}>
          <label
            htmlFor="slot"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Slot
          </label>
          <input
            type="text"
            id="slot"
            name="slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="slot "
          />
        </div>
        <div className="mb-5" style={{ width: "45%" }}>
          <label
            htmlFor="NIC"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Day
          </label>
          <input
            type="text"
            id="day"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="day "
          />
        </div>
      </div>

      <h6 className="ms-3 mb-2 mt-3"> Course </h6>
      <div className="flex flex-row justify-around">
        <div className="mb-5" style={{ width: "45%" }}>
          <label
            htmlFor="slot"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Course Id
          </label>
          <input
            type="text"
            id="slot"
            name="slot"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Course ID"
          />
        </div>
        <div className="mb-5" style={{ width: "45%" }}>
          <label
            htmlFor="NIC"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Course
          </label>
          <input
            type="text"
            id="day"
            name="day"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Course "
          />
        </div>
      </div>

      <div className="flex justify-end me-3">
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default UpdateUserForm;
