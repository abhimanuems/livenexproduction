import React from "react";
import { BsFacebook, BsYoutube } from "react-icons/bs";

const Chat = (props) => {
  const YTComments = props.comments[1];
  const fbComments = props.comments[0];

  return (
    <div className="mb-2 text-left overflow-hidden">
      <div className="py-2 px-4 rounded-lg inline-block ">
        {YTComments
          ? YTComments.map((index) => (
              <div className=" bg-gray-300 w-96 p-2 m-1">
                <p className="flex" key={index.id}>
                  <BsYoutube
                    style={{
                      fontSize: "20px",
                      color: "red",
                      paddingRight: "3px",
                    }}
                  />
                  <span>{index.displayName}</span>
                </p>
                <p className="text-sm pl-5">{index.displayMessage}</p>
              </div>
            ))
          : null}

        {fbComments
          ? fbComments.map((index) => (
              <div className=" bg-gray-300 w-96 p-2 m-1">
                <p className="flex " key={index.id}>
                  <BsFacebook
                    style={{
                      fontSize: "20px",
                      color: "blue",
                      paddingRight: "3px",
                    }}
                  />
                  <span>{index.name}</span>
                </p>
                <p className="text-sm pl-5">{index.message}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Chat;
