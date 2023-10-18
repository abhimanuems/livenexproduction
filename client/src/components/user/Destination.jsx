import React, { useState, useEffect } from "react";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setFbRTMPURL, setyoutubeRTMPURL } from "../../slices/userDetails";
import {
  useFacebookAccessTokenMutation,
  useRtmpUrlFBMutation,
  useRtmpUrlYoutubeMutation,
  useYoutubeTokenMutation,
  useStreamDetailsMutation,
} from "../../slices/userApiSlice";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFb, setFb] = useState(false);
  const [isYoutube, SetYoutube] = useState(false);
  const [isAdddestination, setDestination] = useState(true);
  const [youTubeAccessToken, setYoutubeAccessToken] = useState(null);
  const navigate = useNavigate();
  const [fbToken] = useFacebookAccessTokenMutation();
  const [youtubeToken] = useYoutubeTokenMutation();
  const dispatch = useDispatch();
  const [rtmpFB] = useRtmpUrlFBMutation();
  const [rtmpYoutube] = useRtmpUrlYoutubeMutation();
  const [streamDetails] = useStreamDetailsMutation();
  const [youtubeTD, setYTTD] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createStream = async () => {
    try {
      if (title.trim() === "") {
        toast.error("Fill the title");
        return;
      }
      if (description.trim() === "") {
        toast.error("fill the description field");
        return;
      }
      if (isYoutube) {
        if (youTubeAccessToken) {
          let flag = 0;
          await youtubeToken({
            authorizeToken: youTubeAccessToken,
            titleDescription: { title, description },
          })
            .unwrap()
            .then(async (res) => {
              toast.info("YT done");
              const rtmpurlYoutube = await rtmpYoutube().unwrap();
              dispatch(setyoutubeRTMPURL({ rtmpurlYoutube }));
            })
            .catch((err) => {
              toast.info("you are not the subscribed to live streaming");
              flag = 1;
            });
          if (flag === 1) {
            navigate("/");
            return;
          }
        }
      }
      if (isFb || isYoutube) {
        setShowModal(false);

        if (isFb) {
          await fbToken({
            titleDescription: { title, description },
          }).unwrap();
          const rtmpUrl = await rtmpFB().unwrap();
          dispatch(setFbRTMPURL({ rtmpUrl }));
        }
        navigate("/video");
        const data = {
          title,
          destinations: {
            youtube: isYoutube,
            facebook: isFb,
          },
        };

        await streamDetails(data).unwrap();
      } else {
        toast.error("select atleast one destination");
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (isFb && isYoutube) {
      setDestination(false);
      setIsMenuOpen(false);
    } else {
      setDestination(true);
    }
    if (isFb || isYoutube) {
      setYTTD(true);
    }
  }, [isFb, isYoutube, youtubeTD]);

  const facebook = () => {
    try {
      const authWindow = window.open(
        "https://livenex.online/users/facebookauth"
      );

      const messageListener = (event) => {
        console.log("event at facebook");
        if (event.origin === "https://livenex.online") {
          const response = event.data;
          authWindow.close();
          window.removeEventListener("message", messageListener);
          if (response) {
            toast.success("facebook added successfull");
          } else {
            toast.error("adding error in facebook");
          }
        }
      };
      window.addEventListener("message", messageListener);
    } catch (error) {
      if (error) throw error;
    }
  };
  const youtube = () => {
    try {
      window.open("https://livenex.online/users/youtubeAuth");

      const messageListener = async (event) => {
        if (event.origin === "https://livenex.online") {
          const response = event.data;
          if (response.message === "AuthenticationSuccessful") {
            const authorizeToken = response.data.authorizeToken;
            setYoutubeAccessToken(authorizeToken);
            toast.info("youtube added successffull");
            window.removeEventListener("message", messageListener);
          } else {
            toast.error("you are not allowed  for live streaming");
          }
        }
      };
      window.addEventListener("message", messageListener);
    } catch (error) {
      if (error) throw error;
    }
  };
  const addFb = () => {
    setFb(true);
    facebook();
  };
  const addYoutube = () => {
    SetYoutube(true);
    youtube();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        className="bg-transparent hover:bg-blue-500 text-[#576CBC] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Live
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-9/12 my-6 mx-auto max-w-3xl">
            <div className="relative w-4/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Select the live Stream Destinations
                  </h3>

                  <button onClick={() => setShowModal(false)}>
                    <GrClose style={{ color: "black" }} />
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pt-6 flex-auto">
                  <p className=" text-slate-500 text-lg leading-relaxed">
                    Destinations you can stream
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    <button className="ml-3">
                      <BsFacebook style={{ fontSize: "40px", color: "blue" }} />
                    </button>
                    <button className="ml-3">
                      <BsYoutube style={{ fontSize: "40px", color: "red" }} />
                    </button>
                  </p>
                  <div className="relative inline-block text-left">
                    <div>
                      <p className=" text-slate-500 text-lg leading-relaxed">
                        Add Destination
                      </p>
                      <div className="flex mx-2 my-2">
                        {isFb ? (
                          <button
                            className="py-2 px-2"
                            onClick={() => setFb(!isFb)}
                          >
                            <BsFacebook
                              style={{ fontSize: "20px", color: "blue" }}
                            />
                          </button>
                        ) : null}
                        {isYoutube ? (
                          <button
                            className="px-2 py-2"
                            onClick={() => SetYoutube(!isYoutube)}
                          >
                            <BsYoutube
                              style={{ fontSize: "20px", color: "red" }}
                            />
                          </button>
                        ) : null}

                        {isAdddestination ? (
                          <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded={isMenuOpen}
                            aria-haspopup="true"
                          >
                            <AiFillPlusCircle
                              style={{ color: "blue", fontSize: "40px" }}
                            />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {isMenuOpen && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div className="py-3 flex" role="none">
                          <a
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            <button className="ml-3" onClick={addFb}>
                              <BsFacebook
                                style={{ fontSize: "30px", color: "blue" }}
                              />
                            </button>
                          </a>
                          <a
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            <button className="ml-3" onClick={addYoutube}>
                              <BsYoutube
                                style={{ fontSize: "30px", color: "red" }}
                              />
                            </button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {youtubeTD ? (
                  <div className="relative m-2 p-2">
                    <label className="m-2 p-2 text-slate-500 text-lg leading-relaxed">
                      Title
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter the title"
                      className="w-11/12 py-3 pl-3 mb-3 pr-4 text-gray-700 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <label className="m-2 p-2 text-slate-500 text-lg leading-relaxed">
                      Description
                    </label>
                    <br />
                    <textarea
                      type="text"
                      placeholder="Fill the description"
                      className="w-11/12 py-3 pl-3 pr-4 text-gray-700 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                ) : null}
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded "
                    type="button"
                    onClick={createStream}
                  >
                    Create Live Stream
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
