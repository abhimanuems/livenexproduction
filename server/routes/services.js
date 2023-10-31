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
  streamingDetails,
  getStreamDetails,
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
import {
  twitchAuth,
  twitchOauthCallback,
  getRTMPTwitch,
} from "../Controllers/twitch.js";

const service = Router();

service.get("/orders", protect, razorpay);

service.post("/success", protect, successFunction);

service.get("/subscription", protect, checkSubscription);

service.post("/tickets", protect, submitTickets);

service.get("/tickets", protect, getTicketData);

service.get("/youtubeauth", protect, youtubeAuth);

service.get("/twitchauth", protect, twitchAuth);

service.get("/twitchcallback", twitchOauthCallback);

service.get("/oauth2callback", oauthCallback);

service.get("/facebookauth", protect, facebook);

service.get("/oauth2callbackfb", oauthCallbackFB);

service.post("/fbtoken", protect, getFbAccessToken);

service.get("/fbcomments", protect, getFbComments);

service.post("/fbcomments", protect, postFBcomments);

service.get("/rtmpFB", protect, getRTMPFB);

service.get("/rtmpYoutube", protect, getRTMPYT);

service.get('/rtmptwitch',protect,getRTMPTwitch)

service.post("/youtubeaccesstoken", protect, accessTokenYoutube);

service.get("/youtubecomments", protect, getYTcomments);

service.post("/youtubecomments", protect, postCommentsYT);

service.get("/fbviewcount", protect, FBviewCount);

service.get("/YTviewcount", protect, YTviewCount);

service.get("/subscriptionslist", protect, viewSubscribers);

service.get("/deleteRTMPURLS", protect, deleteRTMPURLS);

service.get("/endYT", protect, YTendStream);

service.get("/streamdetails", protect, getStreamDetails);

service.post("/streamdetails", protect, streamingDetails);

export default service;
