import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4200/api/course", {
          withCredentials: true, // Send cookies with the request
        });

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
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
              <h1 className="text-white text-4xl font-bold">Welcome</h1>
              <h2 className="text-white">Expolore Our Collection of courses </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full mx-auto">
      <div className="about-us py-16">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          auctor, nunc id aliquet ultricies, nisl nunc tincidunt nunc, et
          aliquam nunc nisl id nunc. Sed auctor, nunc id aliquet ultricies, nisl
          nunc tincidunt nunc, et aliquam nunc nisl id nunc.
        </p>
      </div>
      </div>
      
    </div>
  );
};

export default HomePage;
