import React, { useState, useEffect } from "react";
import axios from "axios";
const Notification = () => {
  const [notificationData, setNotofocationData] = useState([]);
  const studentId = localStorage.getItem("id");
  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/learner/auth/notification/${studentId}`
        );
        setNotofocationData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotificationData();
  }, []);

  console.log(notificationData);

  return (
    <div>
      <div className="">
        <div
          className="banner w-full h-[300px] bg-black object-cover bg-center bg-no-repeat bg-cover relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1665289420709-de6afce8d0a8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="container flex flex-row items-center h-full">
            <div className="flex gap-3 flex-col">
              <h1 className="text-white text-4xl font-bold">Notifications</h1>
              <h2 className="text-white">See your Notification History</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-5">
            {notificationData.map((notification) => (
                <div key={notification.id} className="p-4 rounded-2xl border border-gray-200 flex w-full justify-between text-accent">
                    <p>{notification.message}</p>
                    <p>{new Date(notification.timestamp).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
