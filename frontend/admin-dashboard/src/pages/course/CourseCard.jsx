import React from 'react'
import { BookOpen, CircleUser, Star } from "lucide-react";

export const CourseCard = ({data}) => {

    console.log(data)
  return (
    <div>
      

{/* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg h-[150px]" src={`uploads/${data?.image}`} alt={`${data?.image}`} />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.category}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{data?.description}</p>

        <div className='flex justify-between'>
        <p><span className='font-medium'>LKR.</span>{data.price.toFixed(2)}</p>
        <a href={`course-details/${data._id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
        </div>
        
    </div>
</div> */}

<div className="grid  gap-1 w-full">
          <div className="card-container">
          <div className="card rounded-2xl p-3 border border-slate-100 cursor-pointer hover:scale-up ">
            <img
              src={`uploads/${data?.image}`}
              className="h-[150px] w-full object-cover rounded-md"
              alt="Course Thumbnail"
            />
            <div className="flex flex-col mt-5">
              <div className="flex flex-row w-full justify-between">
                <p className="text-[0.875rem] text-accent">instructor id</p>
                <div className="flex flex-row gap-2 items-center">
                  <Star size={16} color="#FFA621" />
                  <p className="text-[0.875rem] text-accent">ss</p>
                </div>
              </div>
              <h2 className="font-[500] mt-2 text-[1.2rem] text-black"><a href={`course-details/${data._id}`}>{data.name}</a></h2>
              <div className="flex justify-between items-end w-full flex-row">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <BookOpen size={16} color="gray" />
                    <p className="text-[0.875rem] text-accent">d</p>
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
  )
}
