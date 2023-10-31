import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import axios from "axios";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
import User from "../models/userModels.js";
import {
  accessTokenFB,
  getUserIdFB,
  getRtmpUrlFB,
} from "../helpers/facebookHelper.js";

const facebook = async (req, res) => {
  try {
     req.session.email = req.userEmail;
    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${process.env.FACEBOOKID}&redirect_uri=${process.env.FACEBOOKAUTHREDIRECTURL}&scope=publish_video,read_insights`;
    res.redirect(authUrl);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//callback from fb
const oauthCallbackFB = async (req, res) => {
  try {
    const userId = req.session.email;
    const authorizationCode = req.query.code;
    if (!authorizationCode) {
      return res.status(400).send("Authorization code missing.");
    }

    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          "facebook.authorizationCode": authorizationCode,
        },
      }
    )
      .then((response) => {})
      .catch((err) => {
        console.error(err);
      });

    res.send(`
          <script>
            window.opener.postMessage('https://livenex.online/');
            window.close();
          </script>
        `);
  } catch (err) {
    if (err.response) {
      console.error("Response Error:", err.response.data);
    } else if (err.request) {
      console.error("Request Error:", err.request);
    } else {
      console.error("Error:", err.message);
    }
  }
};

//for get accessing tokens

const getFbAccessToken = async (req, res) => {
  try {
    const title = req.body.titleDescription.title;
    const description = req.body.titleDescription.description;
    const response = await accessTokenFB(req.userEmail);

    if (response) {
      const userId = await getUserIdFB(response.data.access_token);

      if (userId) {
        const rtmpUrl = await getRtmpUrlFB(
          userId,
          response.data.access_token,
          req.userEmail,
          title,
          description
        );
      }
      res.status(200).json(response.data.access_token);
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
};

const getFbComments = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.userEmail });
    const accessToken = result.facebook.accessToken;
    const liveVideoId = result.facebook.liveVideoId;
    await axios
      .get(
        `https://graph.facebook.com/${liveVideoId}/comments?access_token=${accessToken}`
      )
      .then((response) => {
        res.status(200).json({ facebookMessage: response.data });
      })

      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error("facebook error at live video", err);
  }
};

const getRTMPFB = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.userEmail });
    res.status(200).json(data.facebook.rtmpUrl);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
};

const postFBcomments = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.userEmail });
    const accessToken = result.facebook.accessToken;

    const liveVideoId = "122119841660032468";

    const commentData = {
      message: "This is my comment on the post",
    };

    const url = `https://graph.facebook.com/v18.0/${liveVideoId}/comments?access_token=${accessToken}`;

    axios.post(url, commentData);
  } catch (err) {
    if (err.response) {
      console.error("Response Error:", err.response.data);
    } else if (err.request) {
      console.error("Request Error:", err.request);
    } else {
      console.error("Error:", err.message);
    }
  }
};

const FBviewCount = async (req, res) => {
  const result = await User.findOne({ _id: req.userEmail });
  const accessToken = result.facebook.accessToken;
  const liveVideoId = result.facebook.liveVideoId;
  axios
    .get(
      `https://graph.facebook.com/v18.0/${liveVideoId}?fields=live_views&access_token=${accessToken}`
    )
    .then((response) => {
      const liveViews = response.data.live_views;
      res.status(200).json({ count: liveViews });
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

const deleteRTMPURLS = async (req, res) => {
  try {
    const id = req.userEmail;
    await User.findByIdAndUpdate(id, {
      $set: {
        "facebook.rtmpUrl": null,
        "youtube.rtmpUrl": null,
        "twitch.rtmpUrl" :null
      },
    })
      .then((response) => {
        res.status(200).json({ response });
      })
      .catch((err) => {
        console.error(err.message);
      });
  } catch (err) {
    console.error(err.message);
  }
};

export {
  facebook,
  oauthCallbackFB,
  getFbAccessToken,
  getFbComments,
  getRTMPFB,
  postFBcomments,
  FBviewCount,
  deleteRTMPURLS,
};
