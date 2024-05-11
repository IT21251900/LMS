import React from "react";
import { BookOpen, CircleUser, Star } from "lucide-react";
import CourseApproveModal from "./CourseApproveModal";
import { ApproveCourse } from "../service/CourseService";

const PendingCourseCard = ({ data }) => {
  console.log(data);

  const handleApprove = async () => {
    try {
      const {
        category,
        name,
        image,
        instructorId,
        price,
        description,
        createdDate,
        credits,
        status,
      } = data;

      const aproveObj = {
        category,
        name,
        image,
        instructorId,
        price,
        description,
        createdDate,
        credits,
        status,
        isApproved: true,
      };

      const res = await ApproveCourse(data._id, aproveObj);
    } catch (error) {}
  };

  return (
    <div>
      <div className="grid  gap-1 w-full">
        <div className="card-container">
          <div className="card rounded-2xl p-3 border border-slate-100 cursor-pointer hover:scale-up ">
            <div className="relative">
              <img
                src={`uploads/${data?.image}`}
                className="h-[150px] w-full object-cover rounded-md"
                alt="Course Thumbnail"
              />
              <div className="absolute top-2 right-0">
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  onClick={() => {
                    if (confirm("Do You want to approve this course?")) {
                      handleApprove();
                    }
                  }}
                  class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  type="button"
                >
                  Approve
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex flex-row w-full justify-between">
                <p className="text-[0.875rem] text-accent">instructor id</p>
                <div className="flex flex-row gap-2 items-center">
                  <Star size={16} color="#FFA621" />
                  <p className="text-[0.875rem] text-accent">ss</p>
                </div>
              </div>
              <h2 className="font-[500] mt-2 text-[1.2rem] text-black">
                <a href={`course-details/${data._id}`}>{data.name}</a>
              </h2>
              <div className="flex justify-between items-end w-full flex-row">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <BookOpen size={16} color="gray" />
                    <p className="text-[0.875rem] text-accent">
                      {data.lessonCount}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <CircleUser size={16} color="gray" />
                    <p className="text-[0.875rem] text-accent">ss</p>
                  </div>
                </div>
                <p className=" text-[1.5rem] text-primary">${data.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCourseCard;
