import React from "react";
import { BookOpen, CircleUser, Star } from "lucide-react";

export const CourseCard = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="grid  gap-1 w-full">
        <div className="card-container">
          <div className="card rounded-2xl p-3 border border-slate-100 cursor-pointer hover:scale-up ">
            <img
              src={`${data?.image}`}
              className="h-[150px] w-full object-cover rounded-md"
              alt="Course Thumbnail"
            />
            <div className="flex flex-col mt-5">
              <div className="flex flex-row w-full justify-between">
                <p className="text-[0.875rem] text-accent">Instructor</p>
                <div className="flex flex-row gap-2 items-center">
                  <Star size={16} color="#FFA621" />
                  <p className="text-[0.875rem] text-accent"></p>
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
                    <p className="text-[0.875rem] text-accent">{data.enrollUserCount}</p>
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
