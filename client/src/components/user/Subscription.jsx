import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useRazporpayMutation,
  useRazporPaySuccessMutation,
} from "../../slices/userApiSlice";
import { useSubscriptionMutation } from "../../slices/userApiSlice";

const Subscription = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [razorpay] = useRazporpayMutation();
  const [razorpaySuccess] = useRazporPaySuccessMutation();
  const [subscribe] = useSubscriptionMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    try {
      const isSub = await subscribe().unwrap();
      console.log(isSub);
      if (isSub) {
        toast.info("you have already subscribed");
        return;
      }
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast.info("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const result = await razorpay().unwrap();
      console.log("result is ", result);

      if (!result) {
        toast.error("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency } = result;

      const options = {
        key: "rzp_test_bLt7yzzH20t8v9",
        amount: amount.toString(),
        currency: currency,
        name: "LiveNex",
        description: "Enjoy seamless streaming",
        image: {},
        order_id: order_id,
        handler: async function (response) {
          let email;
          if (userInfo.deatils.email) {
            email = userInfo.deatils.email;
          } else {
            email = userInfo.deatils;
          }
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email,
          };
          const result = await razorpaySuccess(data).unwrap();
          if (result.msg) toast.info("payment successful");
          if (result.msg_error) toast.error("payment failure");
        },
        prefill: {
          name: "LiveNex",
          email: "livenex@gmail.com",
          contact: "985745310",
        },
        notes: {
          address: "Example Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="bg-white pt-8">
      <div className="mt-0 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Upgrade your plan to grow your audience and brand
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dive deeper into streaming, expand your reach and brand.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Monthly subscription
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Are you ready to take your content creation to the next level?
              With our Monthly Premium Streaming Subscription, you'll unlock a
              world of possibilities for your live broadcasts. Whether you're a
              content creator, influencer, or business professional, this
              subscription plan is tailored to elevate your streaming
              experience.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8  gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              <li className="flex gap-x-3">
                <FaCheck
                  className="h-6 w-5 flex-none text-"
                  aria-hidden="true"
                />
                <p>Unlimited Streaming</p>
                <FaCheck
                  className="h-6 w-5 flex-none text-"
                  aria-hidden="true"
                />
                <p>Instant stream to Socail Media's</p>
                <FaCheck
                  className="h-6 w-5 flex-none text-"
                  aria-hidden="true"
                />
                <p>Live chat engagement </p>
                <p>High quality audio and video</p>
                <FaCheck
                  className="h-6 w-5 flex-none text-"
                  aria-hidden="true"
                />
                <p>On demand recording</p>
              </li>
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Subscribe and Stream without any interuptions
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    ₹1999
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    INR
                  </span>
                </p>
                <a
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  onClick={displayRazorpay}
                >
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
