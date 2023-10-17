import React, { useState } from "react";
import { useTicketReplyMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";

const TicketReply = (props) => {
  const email = props.email;
  const subject = props.subject;
  const id = props.id;
  const [replyMessage, setReplyMessage] = useState("");
  const [ticketReplyAPI] = useTicketReplyMutation();
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyMessage.trim() === "") {
      toast.info("Enter reply text");
      return;
    }
    const data = { email, subject, replyMessage, id };
    await ticketReplyAPI({ data })
      .unwrap()
      .then((res) => {
        toast.info("Ticket resolved");
        props.isReply(false);
        props.ticketData(null);
      })
      .catch((err) => {
        console.error("Internal error", err);
      });
    setReplyMessage("");
  };

  return (
    <div className="border-s-white">
      <h2 className="text-3xl mb-4 mt-5 text-center text-[#19376D] font-semibold">
        Resolve to Ticket
      </h2>
      <form onSubmit={handleReplySubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="text"
            value={email}
            className="w-full p-2 border border-gray-300 rounded-xl"
            style={{ width: "50%" }}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Subject:
          </label>
          <input
            type="text"
            value={subject}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-xl"
            style={{ width: "50%" }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Reply Message:
          </label>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            rows="4"
            required
            className="w-full p-2 border border-gray-300 rounded-xl"
            style={{ width: "50%" }}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
        >
          Send Reply
        </button>
      </form>
    </div>
  );
};

export default TicketReply;
