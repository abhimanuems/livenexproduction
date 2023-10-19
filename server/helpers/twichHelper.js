import axios from "axios";
const getAccessToken = async (code) => {
  try {
    return await axios.post("https://id.twitch.tv/oauth2/token", null, {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.TWITCH_CALL_BACK_URL_PRO,
      },
    });
  } catch (err) {
    console.log("error from getAccessToken:", err.message);
  }
};

const getUserId = async (accessToken) => {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/users", {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = response.data.data[0];
    const user_id = userData.id;
    return user_id;
  } catch (err) {
    console.log("error from getUserId:", err.message);
  }
};

const getStreamKey = async (accessToken, user_id) => {
 
  try {
    const config = {
      method: "get",
      url: "https://api.twitch.tv/helix/streams/key",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
      params: {
        broadcaster_id: user_id,
      },
    };
    const response = await axios(config);

    if (response.status === 200) {
      const streamKey = response.data.data[0].stream_key;
      return streamKey;
    } else {
      console.error("Failed to retrieve stream key:", response.data);
    }
  } catch (err) {
    console.log("error from getStreamKey:", err.message);
  }
};
export { getAccessToken, getUserId, getStreamKey };
