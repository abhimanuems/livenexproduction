import React from "react";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { useEffect } from "react";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

const Share = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo){
      navigate('/login');
    }
  },[])
  return (
    <div className="mt-10 overflow-hidden">
      <h1 className="text-4xl text-center text-gray-500 font-bold">
        Multistream Everywhere Easily
      </h1>
      <div className=" ml-6 p-2 text-gray-500 text-center text-lg mt-4 mx-8 font-light">
        <p className="m-2 p-2">
          ✨ Stream to Youtube, Facebook destinations at the same time.
        </p>
        <p className="m-2 p-2">
          ✨ No complicated downloads — livestream directly from your browser.
        </p>
        <p className="m-2 p-2">✨ Start your first stream in &lt; 15 seconds</p>
      </div>
      <div className="mt-8 ml-96 ">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/3 px-4 flex justify-between">
            <div className="icon-website-container mx-auto">
              <span className="ml-20">
                <BsYoutube style={{ fontSize: "70px", color: "red" }} />
              </span>
              <p className="text-gray-500  text-lg mt-2 font-light">Youtube</p>
            </div>
          </div>

          <div className="w-full sm:w-1/3 px-4">
            <div className="icon-website-container mx-auto">
              <span className="ml-20">
                <BsFacebook style={{ fontSize: "70px", color: "blue" }} />
                <p className="text-gray-500  text-lg mt-2 font-light">
                  Facebook
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
