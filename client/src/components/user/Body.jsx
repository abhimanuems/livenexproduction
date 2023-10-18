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
  const [data,setData] =useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [subscribe] = useSubscriptionMutation();
  const [streamsAPI] = useGetPastStreamsMutation();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      streamsAPI()
        .unwrap()
        .then((pdata) => {
          console.log("streaing ddata is ", pdata);
          setData(pdata);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, [navigate, userInfo, data]);

  useEffect(() => {
    const isSubscribed = subscribe().unwrap();
    if (isSubscribed) {
      setPro(true);
    } else {
      setPro(false);
    }
    dispatch(clearRTMPURLS());
  }, [pro]);

  const handleModal = () => {
    return true;
  };



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
      {data?.length > 0 ? (
        <div>
          <p className="font-semibold text-gray-700 text-lg p-2 m-2">
            Past streams
          </p>
          <div className="relative overflow-x-auto shadow-l sm:rounded-lg mt-1">
            <table className="w-3/4 text-sm text-center text-gray-200 dark:text-gray-200">
              <thead className="text-xs bg-gray-50 dark:bg-gray-50 dark:text-gray-50">
                <tr className="bg-gray-100 text-gray-800 text-xs leading-normal">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Platforms</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="text-gray-600 text-sm font-medium">
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4 ">
                      <div className="truncate max-w-xs">{item?.startTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      {item.destinations === "youtube" ? (
                        <span className="text-red-500">
                          <BsYoutube />
                        </span>
                      ) : item.destinations === "facebook" ? (
                        <span className="text-blue-500"><BsFacebook/></span>
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
