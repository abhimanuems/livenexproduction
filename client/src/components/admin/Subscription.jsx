import React, { useEffect, useState } from "react";
import { useSubscriptionListMutation } from "../../slices/adminApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Subscription = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [subscriptionList, setSubscriptionList] = useState(null);
  const [subscriptionAPI] = useSubscriptionListMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminInfo) {
      navigate("/admins/login");
    }
    getSubscriptionList();
  }, []);

  const getSubscriptionList = async () => {
    await subscriptionAPI()
      .unwrap()
      .then((data) => {
        setSubscriptionList(data.subscriptions);
        console.log("subscription lisy ", subscriptionList);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return subscriptionList?.length ? (
    <>
      <div className=" w-5/6 bg-gray-100">
        <div className="bg-gray-100 text-center mt-4">
          <h1 className="text-[#19376D] text-xl font-bold">
            Subscription List
          </h1>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-screen min-h-screen bg-gray-100 flex items justify-center font-sans overflow-hidden">
            <div className="w-full lg:w-4/6">
              <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-10 overflow-y-auto scrollbar-hide ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">StartDate</th>
                      <th className="py-3 px-6 text-center">End Date</th>
                      <th className="py-3 px-6 text-center">Active</th>
                    </tr>
                  </thead>
                  {subscriptionList
                    ? subscriptionList.map((index) => (
                        <tbody className="text-gray-600 text-sm font-light">
                          <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {index.email}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span>
                                  {formatDate(index.razorpayDetails.startDate)}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>
                                  {formatDate(index.razorpayDetails.startDate)}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>
                                  {index.razorpayDetails.success ? (
                                    <span className="text-green-400">
                                      Active{" "}
                                    </span>
                                  ) : (
                                    <span className="text-red-400">
                                      Inactive
                                    </span>
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
    </>
  ) : (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">No subscribers</h2>
      <div className="bg-white  p-6 text-center">
        <p className="text-center text-red-500">No items to display.</p>
      </div>
    </div>
  );
};

export default Subscription;
