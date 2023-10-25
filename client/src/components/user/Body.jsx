import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useSubscriptionMutation,
  useGetPastStreamsMutation,
} from "../../slices/userApiSlice";
import { clearRTMPURLS } from "../../slices/userDetails.js";
import Destination from "../user/Destination";
import { toast } from "react-toastify";
import { BsFacebook, BsYoutube } from "react-icons/bs";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pro, setPro] = useState(false);
  const [data, setData] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [subscribe] = useSubscriptionMutation();
  const [streamsAPI, { isLoading }] = useGetPastStreamsMutation();
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!hasFetchedData && !isLoading) {
        streamsAPI()
          .unwrap()
          .then((pdata) => {
            setData(pdata);
            setHasFetchedData(true);
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
    }
  }, [navigate, userInfo, hasFetchedData, isLoading]);

  useEffect(() => {
    subscribe()
      .unwrap()
      .then((res) => {
        setPro(true);
      })
      .catch((err) => setPro(false));

    dispatch(clearRTMPURLS());
  }, [pro]);

  const handleModal = () => {
    return true;
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    return formattedDate;
  }

  return (
    <div className="bg-white w-5/6 p-4">
      <p className="font-semibold text-blue-900 text-2xl p-2 m-2">Streams</p>
      <div className="m-2 p-2">
        {pro ? (
          <Destination onClick={handleModal} />
        ) : (
          <button
            className="bg-transparent hover:bg-blue-500 text-[#576CBC] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="button"
            onClick={() => toast.info("subscribe to continue")}
          >
            Create Live
          </button>
        )}
      </div>
      <hr />
      {hasFetchedData && data?.response?.length > 0 ? (
        <div>
          <p className="font-semibold text-gray-700 text-lg p-2 m-2">
            Past streams
          </p>
          <div className="relative max-h-80 overflow-y-auto scrollbar-hide shadow-l sm:rounded-sm mt-1">
            <table className="w-3/4 text-sm  text-center text-gray-200 border border-slate-200">
              <thead className="text-xs bg-gray-50 dark:bg-gray-50 dark:text-gray-50">
                <tr className="bg-gray-50 text-gray-800 text-xs leading-normal border border-slate-200">
                  <th className="px-6 py-3 text-center">Title</th>
                  <th className="px-6 py-3 text-center">Date</th>
                  <th className="px-6 py-3 text-left">Platforms</th>
                </tr>
              </thead>
              <tbody>
                {data?.response?.map((item, index) => (
                  <tr
                    key={index}
                    className="text-gray-600 text-sm font-medium border border-slate-200"
                  >
                    {console.log(item)}
                    <td className="px-6 py-4">{item?.title}</td>
                    <td className="px-6 py-4 ">
                      <div className="truncate max-w-xs">
                        {formatDate(item?.startTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex text-center">
                      {item?.destinations[0]?.youtube === true ? (
                        <BsYoutube
                          style={{
                            fontSize: "20px",
                            color: "red",
                          }}
                        />
                      ) : null}
                      {item?.destinations[0]?.facebook === true ? (
                        <BsFacebook
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            marginLeft: "2rem",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-semibold text-gray-700 text-sm p-2 m-2">
            No Past streams
          </p>
        </div>
      )}
    </div>
  );
};

export default Body;
