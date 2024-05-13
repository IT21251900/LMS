import { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import GetClientToken, {
  GetCStudentByID,
  GetCourseByID,
  ProcessPayment,
} from "./service/PaymentService";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { id, price } = useParams();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [leanerData, setLeanerData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const navigate = useNavigate();
  const StudentId = localStorage.getItem("id");

  const fetchLearner = async () => {
    const learner = await GetCStudentByID(StudentId);
    console.log("learner", learner.data);
    if (learner) {
      setLeanerData(learner.data);
    }
  };

  const fetchCourse = async () => {
    const course = await GetCourseByID(id);
    console.log("course", course.data.data);
    console.log(course.data.data);
    if (course) {
      setCourseData(course.data.data);
    }
  };

  const fetchClientToken = async () => {
    try {
      const response = await GetClientToken();
      const data = response.data;
      setClientToken(data);
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  const fetchData = async () => {
    await fetchClientToken();
    await fetchLearner();
    await fetchCourse();
  };

  useEffect(() => {
    // Fetch client token from your server
    fetchData();
  }, []);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();

      const paymentObj = {
        nonce,
        amount: price,
        enrollment: {
          learner: leanerData?.firstname + " " + leanerData?.lastname,
          course: courseData.name,
          courseId: id,
          learnerId: StudentId,
        },
      };

      const res = await ProcessPayment(paymentObj);
      const data = res.data;
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(`/enroll/${id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      {clientToken ? (
        <div>
          {/* Payment form */}
          <div className="flex flex-col w-1/2 mx-auto mt-5">
            <div>
              <h2> Pay Your Course Free Before Enroll To Course </h2>
              <h3> Course Free : ${price}</h3>
            </div>
            <DropIn
              options={{ authorization: clientToken }}
              onInstance={(inc) => setInstance(inc)}
            />
            {!isSuccess ? (
              <div className="flex justify-end mt-3">
                <button
                  onClick={handlePayment}
                  type="button"
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Pay
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex justify-center h4 "> Loading... . .</div>
      )}
    </>
  );
};

export default PaymentPage;
