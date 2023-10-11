import { Router } from "express";
import {
  razorpay,
  successFunction,
  checkSubscription,
  submitTickets,
  getTicketData,
} from "../Controllers/paymentservices.js";
import {
  youtubeAuth,
  oauthCallback,
  accessTokenYoutube,
  getRTMPYT,
  getYTcomments,
  postCommentsYT,
  YTviewCount,
  viewSubscribers,
  YTendStream,
} from "../Controllers/oAuthservices.js";
import { protect } from "../middileware/authmiddileware.js";
import {
  facebook,
  oauthCallbackFB,
  getFbAccessToken,
  getFbComments,
  getRTMPFB,
  postFBcomments,
  FBviewCount,
  deleteRTMPURLS,
} from "../Controllers/facebook.js";

const service = Router();

service.get("/orders", protect, razorpay);

service.post("/success", protect, successFunction);

service.get("/subscription",protect, checkSubscription);

service.post("/tickets",protect,submitTickets);

service.get("/tickets",protect,getTicketData);

service.get("/youtubeauth", protect, youtubeAuth);

service.get("/oauth2callback", oauthCallback);

service.get("/facebookauth", protect, facebook);

service.get("/oauth2callbackfb", protect, oauthCallbackFB);

service.post("/fbtoken", protect, getFbAccessToken);

service.get("/fbcomments", protect, ()=> {return []}, getFbComments);

service.post("/fbcomments", protect, postFBcomments);

service.get("/rtmpFB", protect, getRTMPFB);

service.get("/rtmpYoutube", protect, getRTMPYT);

service.post("/youtubeaccesstoken", protect, accessTokenYoutube);

service.get("/youtubecomments", protect, getYTcomments);

service.post("/youtubecomments", protect, postCommentsYT);

service.get("/fbviewcount", protect, FBviewCount);

service.get("/YTviewcount", protect, YTviewCount);

service.get("/subscriptionslist", protect, viewSubscribers);

service.get("/deleteRTMPURLS", protect, deleteRTMPURLS);

service.get("/endYT", protect, YTendStream);
export default service;
