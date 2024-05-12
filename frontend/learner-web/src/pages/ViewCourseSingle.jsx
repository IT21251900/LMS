import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Collapse, Progress, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const ViewCourseSingle = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [progressData, setProgressData] = useState({});
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      window.location.href = "/login";
    } else {
      fetchCourseData();
    }
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`http://localhost:4200/course/${id}`);
      setCourseData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId && courseData) {
      checkAllLessonProgress();
    }
  }, [userId, courseData]);

  const getLessonStatus = async (lessonId) => {
    try {
      const response = await axios.get(
        `http://localhost:4200/learner/auth/lesson/${userId}/${id}/${lessonId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { lessonProgress: { progress: 0 } }; // Return default progress if there's an error
    }
  };

  const checkAllLessonProgress = async () => {
    try {
      const progressArray = await Promise.all(
        courseData.lessons.map((lesson) => getLessonStatus(lesson._id))
      );
      const progressMap = {};
      progressArray.forEach((progress, index) => {
        progressMap[courseData.lessons[index]._id] = progress;
      });
      setProgressData(progressMap);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsComplete = async (lessonId) => {
    const payload = {
      userId: userId,
      courseId: id,
      lessonId: lessonId,
      progress: 1,
    };

    try {
      const response = await axios.put(
        "http://localhost:4200/learner/auth",
        payload
      );
      setCourseData(response.data.data);
      message.success("Lesson marked as complete");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProgressUpdate = async (lessonId) => {
    await markAsComplete(lessonId);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleUnenroll = async () => {
    const payload = {
      userId: userId,
      courseId: id,
    };

    try {
      const response = await axios.post(
        `http://localhost:4200/learner/auth/${userId}/unenroll`,
        payload
      );
      setCourseData(response.data.data);
      message.success("Unenrolled successfully");
      setTimeout(() => {
        window.location.href = "/my-courses";
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {courseData && (
        <div className="container py-16">
          <div className="flex flex-col md:flex-row justify-between my-4 md:items-center">
            <h2 className="text-[3rem] font-[500]">{courseData.name}</h2>
            <div className="flex flex-row justify-between my-4 items-center">
              <p className="text-accent mr-5">{`Completed ${
                courseData.lessons.filter((lesson) => lesson.viewed).length
              } out of ${courseData.lessons.length}`}</p>
              <Progress
                type="circle"
                percent={Math.round(
                  (courseData.lessons.filter((lesson) => lesson.viewed).length /
                    courseData.lessons.length) *
                    100
                )}
                width={50}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="md:col-span-3">
              <div className="my-8">
                <p className="text-accent text-[1.2rem] font-[100]">
                  {courseData.description}
                </p>
              </div>
              <div className="my-8">
                <h3 className="text-[1.5rem] font-[500] mb-4">Course Lessons</h3>
                <Collapse accordion>
                  {courseData.lessons.map((lesson, index) => (
                    <Collapse.Panel
                      header={lesson.title}
                      key={index}
                      extra={
                        progressData[lesson._id]?.lessonProgress?.progress === 0 ? (
                          <Button onClick={() => handleProgressUpdate(lesson._id)}>
                            Mark as Completed
                          </Button>
                        ) : (
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "24px" }} />
                        )
                      }
                    >
                      <div className="p-4 rounded-md">
                        {lesson.notes.map((note, noteindex) => (
                          <div className="" key={noteindex}>
                            {note.note_url && (
                              <a
                                target="_blank"
                                href={note.note_url}
                                className="font-[500]"
                              >
                                {note.title}
                              </a>
                            )}
                            {!note.note_url && (
                              <h3 className=" text-[.87rem] font-[500]">
                                {note.title}
                              </h3>
                            )}
                            <p className="text-accent">{note.description}</p>

                            <div className="w-full h-[2px] bg-slate-200 my-2"></div>
                          </div>
                        ))}
                      </div>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </div>
            </div>
            <div className="col-span-1 border border-gray-100 rounded-3xl p-4 h-fit">
              <img
                src={courseData.image}
                className="w-full h-auto object-cover rounded-2xl "
                alt="Course"
              />
              <div className="flex justify-between items-center w-full mt-4">
                <p className="text-accent text-[.87rem]">Instructor</p>
                <p className="text-accent text-[.87rem]">{courseData.instructorId}</p>
              </div>
              <div className="w-full h-[2px] bg-slate-100 my-4"></div>
              <div className="flex justify-between items-center w-full">
                <p className="text-accent text-[.87rem]">No. of Credits</p>
                <p className="text-accent text-[.87rem]">{courseData.credits}</p>
              </div>
              <div className="w-full h-[2px] bg-slate-100 my-4"></div>
              <div className="flex justify-between items-center w-full">
                <p className="text-accent text-[.87rem]">No.of Enrolled Students</p>
                <p className="text-accent text-[.87rem]">{courseData.enrollUserCount}</p>
              </div>
              <div className="w-full h-[2px] bg-slate-100 my-4"></div>
              <div className="flex justify-between items-center w-full">
                <p className="text-accent text-[.87rem]">No.of Lessons</p>
                <p className="text-accent text-[.87rem]">{courseData.lessonCount}</p>
              </div>
              <div className="flex flex-row justify-end mt-5">
                <Button type="primary" color="red" onClick={handleUnenroll}>
                  Unenroll
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourseSingle;
