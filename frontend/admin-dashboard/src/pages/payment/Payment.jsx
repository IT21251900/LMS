import React, { useEffect, useState } from "react";
import PaymentViewModal from "./componet/PaymentViewModal";
import GetAllPayments from "./service/PaymentService";
import { ViewPaymentDialog } from "./componet/ViewPaymentDialog";
import { Card, Button, CardBody, Typography } from "@material-tailwind/react";

function Payment() {
  const [usersData, setUsersData] = useState([]);
  const [newOpen, setNewOpen] = useState(false);
  const newHandleOpen = () => setNewOpen((cur) => !cur);
  const handleOpen = (val) => {
    setPay(val);
    setNewOpen((cur) => !cur);
  };
  const [pay, setPay] = useState({});

  const [noteDetails, setNoteDetails] = useState([]);

  const [tableLoading, setTableLoading] = useState(false);
  const handleLoading = () => setTableLoading((pre) => !pre);

  const fetchData = async () => {
    try {
      const res = await GetAllPayments();
      setUsersData(res.data.data);
    } catch (error) {
      console.log("u", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
      <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
        <div className="font-bold flex flex-row justify-between mb-2">
          <Typography
            variant="h4"
            className="font-inter font-bold tracking-wide"
            color="blue-gray"
          >
            Payments
          </Typography>
          <div></div>
        </div>

        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {usersData && usersData.length > 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Date
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Payment ID
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Amount
                        <a href="#">
                          <svg
                            className="w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </a>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersData && usersData.length > 0
                    ? usersData.map((payment, key) => (
                        <tr
                          key={key}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4">{key + 1}</td>
                          <td className="px-6 py-4">
                            {payment.createdAt.slice(0, 10)}
                          </td>
                          <td className="px-6 py-4">{payment.paymentId}</td>
                          <td className="px-6 py-4">{payment.amount}</td>
                          <td className="py-4 text-right flex flex-row">
                            <Button
                              type="button"
                              color="blue"
                              onClick={() => handleOpen(payment)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center">
                <h3> Payments are not avialabel</h3>
              </div>
            )}
          </div>
        </div>
      </CardBody>
      <ViewPaymentDialog
        handleOpen={newHandleOpen}
        open={newOpen}
        handleLoading={handleLoading}
        payment={pay}
      />
    </Card>
  );
}

export default Payment;
