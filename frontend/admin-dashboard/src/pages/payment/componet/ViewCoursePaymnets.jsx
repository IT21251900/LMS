import React, { useEffect, useState } from "react";
import { Dialog, Card, Button } from "@material-tailwind/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../../utils/icons";
import { GetPaymentsByCourseId } from "../service/PaymentService";
import CoursePaymentsTabel from "./CoursePaymentsTabel";

export const ViewCoursePaymnets = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState([]);

  const handleButton = () => {
    setOpen(!open);
  };

  const fetchPayments = async () => {
    const res = await GetPaymentsByCourseId(courseId);
    setPayments(res.data.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <div className="me-3">
        <Button onClick={handleButton} color="blue">
          Payment Details
        </Button>
      </div>
      <Dialog
        size="lg"
        open={open}
        handler={handleButton}
        className="bg-transparent shadow-none rounded-sm font-inter h-[80%]"
      >
        <Card className="mx-auto w-full p-5 rounded-sm">
          <div className="flex justify-between align-center border-b-2">
            <div className="font-inter text-lg font-bold border-grey pb-5">
              Payment Details
            </div>
            <div
              className="font-bold text-[20px] cursor-pointer"
              onClick={handleButton}
            >
              <CloseIcon />
            </div>
          </div>
          <div>
            <CoursePaymentsTabel payments={payments} />
          </div>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
};
