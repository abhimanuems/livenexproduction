import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import axios from "axios";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
import User from "../models/userModels.js";

const accessTokenFB = async (id) => {
  try {
    const result = await User.findOne({ _id: id });
    if (!result) {
      throw new Error("User not found");
    }

    const response = await axios.post(
      `https://graph.facebook.com/v12.0/oauth/access_token`,
      null,
      {
        params: {
          client_id: process.env.FACEBOOKID,
          redirect_uri: process.env.FACEBOOKAUTHREDIRECTURL,
          client_secret: process.env.FACEBOOKAPPSECRET,
          code: result.facebook.authorizationCode,
        },
      }
    );
    if (response) {
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            "facebook.accessToken": response.data.access_token,
          },
        }
      );
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};

const getUserIdFB = async (accessTokenFB) => {
  try {
    const res = await axios.get(
      `https://graph.facebook.com/v12.0/me?fields=id&access_token=${accessTokenFB}`
    );
    return res.data.id;
  } catch (error) {
    console.error("Error fetching user data:", error.response.data);
  }
};

const getRtmpUrlFB = async (userId, accessToken, id, title, description) => {
  const postData = {
    status: "LIVE_NOW",
    title: title,
    description: description,
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/${userId}/live_videos`,
      null,
      {
        params: postData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await User.findByIdAndUpdate(id, {
      $set: {
        "facebook.rtmpUrl": response.data.stream_url,
        "facebook.liveVideoId": response.data.id,
      },
    });
  } catch (error) {
    console.error("Error posting live video:", error);
  }
};

export { accessTokenFB, getUserIdFB, getRtmpUrlFB };
