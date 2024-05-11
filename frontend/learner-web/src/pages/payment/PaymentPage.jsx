import { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import GetClientToken, { ProcessPayment } from "./service/PaymentService";

const amount = 200;

const PaymentPage = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Fetch client token from your server
    fetchClientToken();
  }, []);

  const fetchClientToken = async () => {
    try {
      const response = await GetClientToken();

      const data = response.data;

      console.log("data", data);
      setClientToken(data);
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();

      const paymentObj = {
        nonce,
        amount,
        enrollment: {
          enrollment_id: "String",
          learner_id: "String",
          course_id: "String",
          prograss_data: "String",
        },
      };

      const res = await ProcessPayment(paymentObj);
      const data = res.data;
      if (data.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      {clientToken ? (
        <div>
          <h1>Payment Page</h1>
          {/* Payment form */}
          <div className="flex flex-col w-1/2 mx-auto">
            <div>
              <h3> Course Free : {amount}</h3>
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
        <div> Loading... . .</div>
      )}
    </>
  );
};

export default PaymentPage;
