import React from "react";

const ViewTickets = (props) => {
  const data = props.data.response;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">Ticket List</h1>

      {data.length === 0 ? (
        <h1 className="text-sm font-bold mb-4 text-blue-700">
          No ticket raised yet!
        </h1>
      ) : (
        <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-1">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-gray-600 text-sm font-medium">
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.subject}</td>
                  <td className="px-6 py-4 description-cell">
                    <div className="truncate max-w-xs">{item.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    {item.status ? (
                      <span className="text-green-500">Resolved</span>
                    ) : (
                      <span className="text-blue-500">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTickets;
