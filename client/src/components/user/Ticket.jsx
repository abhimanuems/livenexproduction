import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useTicketMutation,
  useTicketDataMutation,
} from "../../slices/userApiSlice";
import ViewTicktes from "../user/ViewTicktes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(userInfo?.deatils);
  const [subject, setSubject] = useState("");
  const [description, SetDescription] = useState("");
  const [ticketAPI] = useTicketMutation();
  const [ticketDataAPI] = useTicketDataMutation();
  const [viewTicket, setViewTicket] = useState(false);
  const [ticketDatas, setTicketData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    getTicketData();
  }, []);
  const getTicketData = async () => {
    await ticketDataAPI()
      .unwrap()
      .then((data) => {
        setTicketData(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("failed to fetch datas");
      });
  };
  const submitTicket = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("kindly fill the email");
      return
    }
    if (subject.trim() === "") {
      toast.error("Enter a subject");
      return
    }
    if (description.trim() === "") {
      toast.error("Enter the description");
      return
    }
    const data = { email, subject, description, status: false };
    ticketAPI(data)
      .unwrap()
      .then((res) => {
        toast.info("Ticket submitted successful");
        setSubject("");
        SetDescription("");
        getTicketData();
        setViewTicket(!viewTicket);
      })
      .catch((err) => {
        console.error(err);
        toast.error("ticket failed");
      });
  };
  return (
    <div>
      <div className="p-1 m-1 text-right">
        {ticketDatas ? (
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setViewTicket(!viewTicket)}
          >
            {!viewTicket ? "View Tickets" : "Raise a ticket"}
          </button>
        ) : null}
      </div>
      {!viewTicket ? (
        <form className="p-5 m-5 pl-5" onSubmit={submitTicket}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-3xl text-center font-semibold leading-7 text-blue-600">
                Submit a Ticket
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your email address
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-200 sm:max-w-md">
                      <input
                        type="email"
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder={email}
                        className="p-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-200 sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      cols={8}
                      className="block  p-1 w-38  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                      style={{ width: "38%" }}
                      onChange={(e) => SetDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              className="rounded-md text-center bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <ViewTicktes data={ticketDatas} />
      )}
    </div>
  );
};

export default Ticket;
