import React, { useEffect, useState } from "react";
import { useTicketsMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import TicketReply from "./TicketReply";

const Ticket = () => {
  const [ticketAPI] = useTicketsMutation();
  const [ticketData, setTicketData] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isReply, setIsreply] = useState(false);
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminInfo){
      navigate('/admins/login')
    } fetchTickets();
  }, [isReply, selectedTicket]);
  const fetchTickets = async () => {
    try {
      const response = await ticketAPI().unwrap();
      const filteredData = response.data.filter(
        (item) => item.tickets && item.tickets.length > 0
      );
      setTicketData(filteredData);
    } catch (err) {
      toast.error("Can't fetch data right now");
    }
  };
  const handleReplyClick = (ticket, item) => {
    setIsreply(true);
    setSelectedTicket(ticket);
  };
  return ticketData?.length ? (
    <div className="container mx-auto p-6">
      {!selectedTicket && !isReply ? (
        <>
          <h1 className="text-2xl text-center text-[#19376D] font-semibold mb-4">
            Ticket List
          </h1>
          <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-5 overflow-y-auto scrollbar-hide ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    reply
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-medium">
                {ticketData?.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.tickets.map((ticket, ticketIndex) => (
                      <tr
                        key={ticketIndex}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="px-6 py-4">{ticket.email}</td>
                        <td className="px-6 py-4">{ticket.subject}</td>
                        <td className="px-6 py-4 description-cell">
                          <div className="truncate max-w-xs">
                            {ticket.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {ticket.status ? (
                            <span className="text-green-500">Resolved</span>
                          ) : (
                            <span className="text-blue-500">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {ticket.status ? null : (
                            <button
                              onClick={() => handleReplyClick(ticket, item)}
                              class="bg-gray-300 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            >
                              Reply
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <TicketReply
          email={selectedTicket.email}
          subject={selectedTicket.subject}
          setSelectedTicket={setSelectedTicket}
          isReply={setIsreply}
          ticketData={setSelectedTicket}
          id={selectedTicket._id}
        />
      )}
    </div>
  ) : (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">No Tickets</h2>
      <div className="bg-white  p-6 text-center">
        <p className="text-center text-red-500">No items to display.</p>
      </div>
    </div>
  );
};

export default Ticket;
