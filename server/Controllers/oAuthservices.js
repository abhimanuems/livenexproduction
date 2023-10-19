import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import {
  getBroadCastId,
  getLiveChat,
  postCommentsYouTube,
  stopStreaming,
} from "../helpers/youtubeHelper.js";
import axios from "axios";
import User from "../models/userModels.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
const oauth2Client = new google.auth.OAuth2(
  process.env.GCLIENTID,
  process.env.GCLIENTSECRET,
  process.env.CALLBACKURL
);
const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client,
});

const youtubeAuth = async (req, res) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/youtube"],
    });
    res.redirect(authUrl);
  } catch (err) {
    if (err) console.error(err.message);
    throw err;
  }
};
const oauthCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const result = await oauth2Client.getToken(code);
    const authorizeToken = result.tokens.access_token;
    const refreshToken = result.tokens.refresh_token;
    oauth2Client.setCredentials(result.tokens);

    res.send(`
      <script>
        window.opener.postMessage({ message: 'AuthenticationSuccessful', data: { authorizeToken: '${authorizeToken}' } }, 'https://livenex.online/');
        window.close();
      </script>
    `);
  } catch (err) {
    console.error("Error in OAuth callback:", err.message);
    res.status(500).send("Error in OAuth callback");
  }
};

const accessTokenYoutube = async (req, res) => {
  try {
    const id = req.userEmail;
    const accessToken = req.body.authorizeToken;
    const title = req.body.titleDescription.title;
    const description = req.body.titleDescription.description;

    User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          "youtube.authorizeToken": accessToken,
        },
      }
    )
      .then((response) => {
        getBroadCastId(res, accessToken, id, youtube, title, description);
      })
      .catch((err) => {
        console.error(err.message);
      });
  } catch (err) {
    console.err(err.message);
  }
};

const getRTMPYT = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.userEmail });
    res.status(200).json(data.youtube.rtmpUrl);
  } catch (err) {
    console.error(err.message);
    res.status(400).json("no rtmpurl");
  }
};

const getYTcomments = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.userEmail });
    const liveChatId = result.youtube.liveChatId;
    const accessToken = result.youtube.authorizeToken;
    const response = await getLiveChat(liveChatId, accessToken);
    res.status(200).json({ response: response.items });
  } catch (err) {
    console.error("Error posting comment:", err.response?.data?.error);
    res.status(400).json({ error: err.response?.data?.error });
  }
};

const postCommentsYT = async (req, res) => {
  try {
    const comment = req.body.comment;
    const result = await User.findOne({ _id: req.userEmail });
    const liveChatId = result.youtube.liveChatId;
    const accessToken = result.youtube.authorizeToken;
    const response = postCommentsYouTube(liveChatId, accessToken, comment);
    res.status(200).json({ response });
  } catch (err) {
    console.error(err.message);
  }
};

const YTviewCount = async (req, response) => {
  try {
    const result = await User.findOne({ _id: req.userEmail });
    const youtubeBroadcastId = result.youtube.broadcastId;
    const youtubeAccessToken = result.youtube.authorizeToken;
    const viewCount = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2C%20status&id=${youtubeBroadcastId}&key=${process.env.GOOGLEAPIKEY}`,
        {
          headers: {
            Authorization: `Bearer ${youtubeAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        response.status(200).json({
          viewCountYT: res.data.items[0].statistics.viewCount,
          likes: res.data.items[0].statistics.likeCount,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err.message);
  }
};

const viewSubscribers = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.userEmail });
    const youtubeAccessToken = result.youtube.authorizeToken;
    const channelId = "UCNsllt2QZeOR8rmRSUWTrsQ";
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&channelId=${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${youtubeAccessToken}`,
            Accept: "application/json",
          },
          params: {
            key: process.env.GOOGLEAPIKEY,
          },
        }
      )
      .then((response) => {
        res.status(200).json({ subscribersList: response.data.items });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (err) {
    console.error(err.message);
  }
};

const YTendStream = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.userEmail });
    const youtubeAccessToken = result.youtube.authorizeToken;
    const broadcastId = result.youtube.broadcastId;
    const response = await stopStreaming(youtubeAccessToken, broadcastId, res);
  } catch (err) {
    console.error(err.message);
  }
};
const getStreamDetails = async (req, res) => {
  try {
    const userId = req.userEmail;
    User.find({ _id: userId }, { streams: 1, _id: 0 })
      .then((response) => {
        res.status(200).json({ response: response[0]?.streams });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const streamingDetails = async (req, res) => {
  try {
    const { title, destinations } = req.body;
    const startTime = Date.now();
    await User.updateOne(
      { _id: req.userEmail },
      {
        $push: {
          streams: {
            title,
            startTime,
            destinations,
          },
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json({ message: "added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errMessage: "error occurs" });
  }
};

export {
  oauthCallback,
  youtubeAuth,
  accessTokenYoutube,
  getRTMPYT,
  getYTcomments,
  postCommentsYT,
  YTviewCount,
  viewSubscribers,
  YTendStream,
  streamingDetails,
  getStreamDetails,
};
