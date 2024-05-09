import React from "react";
import { BookOpen, CircleUser, Star } from "lucide-react";

const Courses = () => {
  // Sample array of data for the cards
  const coursesData = [
    {
      instructor: "John Doe",
      credits: 5,
      courseName: "Introduction to React",
      books: 10,
      users: 150,
      price: 49.99,
      imageUrl: "https://www.classcentral.com/report/wp-content/uploads/2020/06/top-100-course-pandemic.png",
    },
    {
      instructor: "Jane Smith",
      credits: 3,
      courseName: "Intermediate JavaScript",
      books: 8,
      users: 100,
      price: 29.99,
      imageUrl: "https://www.aeccglobal.lk/images/2023/09/08/automobile%20courses%20in%20uk.webp",
    },
    {
      instructor: "Alex Johnson",
      credits: 4,
      courseName: "Python Basics",
      books: 12,
      users: 200,
      price: 39.99,
      imageUrl: "https://www.aeccglobal.in/images/easyblog_articles/1380/automobile-courses-in-canada.webp",
    },
    {
      instructor: "Emily Brown",
      credits: 3,
      courseName: "Data Science Fundamentals",
      books: 7,
      users: 120,
      price: 44.99,
      imageUrl: "https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/65c28fda8a071e64c4ae94ff_374_DesignBlogHeader_2400x1260.jpg",
    },
    {
      instructor: "Michael Lee",
      credits: 5,
      courseName: "Web Development Bootcamp",
      books: 15,
      users: 250,
      price: 59.99,
      imageUrl: "https://www.elegantthemes.com/blog/wp-content/uploads/2023/12/best-ai-courses-featured-img.jpg",
    },
    {
      instructor: "Sophia Garcia",
      credits: 4,
      courseName: "Machine Learning 101",
      books: 9,
      users: 180,
      price: 54.99,
      imageUrl: "https://www.pickl.ai/blog/wp-content/uploads/2023/06/Top-6-Artificial-Intelligence-Courses-for-Beginners.jpg",
    },
    // Add more objects for additional courses as needed
  ];

  return (
    <div>
      <div className="">
        <div
          className="banner w-full h-[300px] bg-black object-cover bg-center bg-no-repeat bg-cover relative"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1665289420709-de6afce8d0a8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
        >
          <div className="container flex flex-row items-center h-full">
            <div className="flex gap-3 flex-col">
              <h1 className="text-white text-4xl font-bold">All Courses</h1>
              <h2 className="text-white">Expolore Our Collection</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {coursesData.map((course, index) => (
          <div key={index} className="card-container">
          <div className="card rounded-2xl p-3 border border-slate-100 cursor-pointer hover:scale-up">
            <img
              src={course.imageUrl}
              className="h-[200px] w-full object-cover rounded-md"
              alt="Course Thumbnail"
            />
            <div className="flex flex-col mt-5">
              <div className="flex flex-row w-full justify-between">
                <p className="text-[0.875rem] text-accent">{course.instructor}</p>
                <div className="flex flex-row gap-2 items-center">
                  <Star size={16} color="#FFA621" />
                  <p className="text-[0.875rem] text-accent">{course.credits}</p>
                </div>
              </div>
              <h2 className="font-[500] mt-2 text-[1.2rem]">{course.courseName}</h2>
              <div className="flex justify-between items-end w-full flex-row">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <BookOpen size={16} color="gray" />
                    <p className="text-[0.875rem] text-accent">{course.books}</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <CircleUser size={16} color="gray" />
                    <p className="text-[0.875rem] text-accent">{course.users}</p>
                  </div>
                </div>
                <p className=" text-[1.5rem] text-primary">${course.price}</p>
              </div>
            </div>
          </div>
        </div>
        
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
