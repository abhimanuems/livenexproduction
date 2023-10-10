import React, { useEffect, useState } from 'react';
import {useUserslistMutation} from "../../slices/adminApiSlice";
import {toast} from 'react-toastify'

const Users = () => {
  const [getUserAPI] = useUserslistMutation();
  const [userslist,setUsersList] = useState([]);
    useEffect(()=>{
      getUsersList();
    },[])
    const getUsersList = async()=>{
    await getUserAPI().unwrap().then((response)=>{
      setUsersList(response.users);
      console.log(response.users);
    }).catch((err)=>{
      console.error(err);
      toast.error("some thing went wrong");
      
    })
    }
      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
      }
  return (
    <div className=" w-5/6 bg-gray-100">
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
                  ? userslist.map((index) => (
                      <tbody className="text-gray-600 text-sm font-light">
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
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
                                  <span className="text-green-500">
                                    Active{" "}
                                  </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users