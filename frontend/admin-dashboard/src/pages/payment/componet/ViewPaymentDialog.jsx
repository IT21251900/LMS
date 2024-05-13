import React, { useState, useEffect } from "react";
import {
  Dialog,
  Card,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../../utils/icons";
import { message } from "antd";
import axios from "axios";
import {
  GetCStudentByID,
  GetCourseByID,
} from "../../course/service/CourseService";

export const ViewPaymentDialog = ({ handleOpen, open, payment }) => {
  const handleClose = () => {
    handleOpen();
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleClose}
        className="bg-transparent shadow-none rounded-sm font-inter h-[80%]"
      >
        <Card className="mx-auto w-full p-5 rounded-sm">
          <div className="flex justify-between align-center border-b-2">
            <div className="font-inter text-lg font-bold border-grey pb-5">
              Payment Details
            </div>
            <div
              className="font-bold text-[20px] cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <form>
            <div className="flex justify-between mt-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Payment ID
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                {payment.paymentId}
              </Typography>
            </div>
            <div className="flex justify-between mt-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Amount
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                ${payment.amount}
              </Typography>
            </div>
            <div className="flex justify-between mt-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Date
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                {payment?.createdAt?.slice(0, 10)}
              </Typography>
            </div>

            <div className="flex justify-between mt-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Learner
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                {payment.enrollment?.learner}
              </Typography>
            </div>
            <div className="flex justify-between mt-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Course
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                {payment.enrollment?.course}
              </Typography>
            </div>
          </form>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
};
