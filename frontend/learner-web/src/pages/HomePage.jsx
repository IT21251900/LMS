// pages/HomePage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4200/course/", {
    })
    .then(response => setData(response.data))
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }, []);

  return (
    <div className="container w-full mx-auto">
      <h1>Home Page</h1>
      <p>Token: {token}</p>
      {/* <p>User : {user}</p> */}
    </div>
  );
};

export default HomePage;
