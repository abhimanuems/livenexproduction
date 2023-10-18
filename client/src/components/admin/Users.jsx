import React, { useEffect, useState } from "react";
import { useUserslistMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const Users = () => {
  const [getUserAPI] = useUserslistMutation();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;
  const [userslist, setUsersList] = useState([]);
  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    await getUserAPI()
      .unwrap()
      .then((response) => {
        setUsersList(response.users);
        console.log(response.users);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  const paginateData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userslist.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return userslist?.length ? (
    <div className="w-5/6 bg-gray-100">
      <div className="bg-gray-100 text-center mt-4">
        <h1 className="text-[#19376D] text-xl font-bold mt-3">User List</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen bg-gray-100 flex items justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-4/6">
            <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-10 ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subscription Status
                    </th>
                  </tr>
                </thead>
                {userslist
                  ? paginateData().map((index) => (
                      <tbody className="text-gray-600 text-sm font-light">
                        <tr className="border-b border-gray-200 hover-bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">{index.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span>{formatDate(index.createdAt)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                              <span>
                                {index.razorpayDetails?.endDate ? (
                                  <span className="text-green-500">Active</span>
                                ) : (
                                  <span className="text-red-500">Inactive</span>
                                )}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))
                  : null}
              </table>
              <div className="mt-4 justify-center text-gray-700">
                {userslist?.length > 8 ? (
                  <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
                    <ReactPaginate
                      containerClassName="flex justify-center"
                      pageLinkClassName="mx-1 p-1"
                      previousLinkClassName="mx-1 p-1"
                      nextLinkClassName="mx-1 p-1"
                      previousLabel=" Prev"
                      nextLabel="Next "
                      onPageChange={handlePageChange}
                      pageRangeDisplayed={5}
                      pageCount={Math.ceil(userslist.length / itemsPerPage)}
                      breakLabel="..."
                      marginPagesDisplayed={2}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">No Users</h2>
      <div className="bg-white p-6 text-center">
        <p className="text-center text-red-500">No items to display.</p>
      </div>
    </div>
  );
};

export default Users;
