import React, { useState } from "react";

function UpdateUserForm({ payment }) {
  const [name, setName] = useState(payment.createdAt);
  const [email, setEmail] = useState(payment.amount);
  const [NIC, setNIC] = useState(payment._id);
  const [courseId, setCourseId] = useState(payment.enrollment?.course_id);
  const [role, setRole] = useState(payment.enrollment.learner_id);

  return (
    <form className="mx-auto">
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
