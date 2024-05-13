import React, { useEffect, useState } from "react";
import GetUsers from "./service/UserService";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { NewUserModal } from "./componet/NewUserModal";
import { UpdateUserModal } from "./componet/UpdateUserModal";
import { DeleteUserModal } from "./componet/DeleteUserModal";

function User() {
  const [usersData, setUsersData] = useState([]);
  const [newOpen, setNewOpen] = useState(false);
  const handleOpen = () => setNewOpen((cur) => !cur);
  const handleLoading = () => setTableLoading((pre) => !pre);
  const fetchData = async () => {
    try {
      const res = await GetUsers();

      setUsersData(res.data.data);
    } catch (error) {
      console.log("u", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ps-10 pe-5 pb-5">
      <Card className="h-fit font-inter rounded-none mx-3 md:ml-6 mr-3">
        <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
          <div className="font-bold flex flex-row justify-between mb-2">
            <Typography
              variant="h4"
              className="font-inter font-bold tracking-wide"
              color="blue-gray"
            >
              Users
            </Typography>
            <div>
              <Button onClick={handleOpen} color="blue">
                New
              </Button>
            </div>
          </div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Email
                    <a href="#">
                      <svg
                        class="w-3 h-3 ms-1.5"
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
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    NIC
                    <a href="#">
                      <svg
                        class="w-3 h-3 ms-1.5"
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
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Role
                    <a href="#">
                      <svg
                        class="w-3 h-3 ms-1.5"
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
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData && usersData.length > 0
                ? usersData.map((user, key) => (
                    <tr
                      key={key}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.name}
                      </th>
                      <td class="px-6 py-4">{user.email}</td>
                      <td class="px-6 py-4">{user.NIC}</td>
                      <td class="px-6 py-4">{user.role}</td>
                      <td class="py-4 text-right flex flex-row">
                        <UpdateUserModal user={user} />
                        <DeleteUserModal user={user} />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <NewUserModal handleOpen={handleOpen} open={newOpen} />
    </div>
  );
}

export default User;
