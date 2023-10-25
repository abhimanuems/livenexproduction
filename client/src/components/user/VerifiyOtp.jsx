import React, { useState, useEffect } from "react";
import { useOtpMutation } from "../../slices/userApiSlice";
import { useSignupMutation } from "../../slices/userApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifiyOtp = () => {
  const [opt1, setOtp1] = useState("");
  const [opt2, setOtp2] = useState("");
  const [otp3, setOpt3] = useState("");
  const [otp4, setOpt4] = useState("");
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const [otpVerify] = useOtpMutation();
  const { userDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      const getOtp = async () => {
        const res = await otpVerify({ email: userDetails.email }).unwrap();
        if (res.error) {
          toast.error("Invalid email");
          navigate("/signup");
          throw new Error("Bad Request");
        } else if (res.success) {
          toast.info("OTP sent to your email");
        }
      };
      getOtp();
    } catch (err) {
      console.error("Error is", err.message);
      throw err;
    }
  }, [otpVerify, userDetails.email]);

  const submitOtp = async (e) => {
    try {
      e.preventDefault();
      if (!opt1 || !opt2 || !otp3 || !otp4) {
        toast.error("Kindly fill all OTP fields");
        return;
      }
      const OTP = opt1 + opt2 + otp3 + otp4;

      // Make the signup API call and await the result
      const result = await signup({
        email: userDetails.email,
        password: userDetails.password,
        OTP,
      }).unwrap();

      if (result.message) {
        toast.info("Account created");
      } else {
        toast.error("Unknown error occurred");
      }

      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      if (err.data.userExists) {
        toast.error("user alreday exists");
        navigate("/login");
      } else if (err.data.otpErr) {
        toast.error("invalid otp");
      } else {
        toast.error("invalid user data");
      }
    }
  };
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {userDetails.email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={submitOtp}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => {
                        setOtp1(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => {
                        setOtp2(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => {
                        setOpt3(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => {
                        setOpt4(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <a
                      className="flex flex-row items-center text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiyOtp;
