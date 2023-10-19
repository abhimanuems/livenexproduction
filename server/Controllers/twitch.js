import {
  getAccessToken,
  getUserId,
  getStreamKey,
} from "../helpers/twichHelper.js";
import User from "../models/userModels.js";

const twitchAuth = (req, res) => {
  try {
    const params = new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      redirect_uri: process.env.TWITCH_CALL_BACK_URL_PRO,
      response_type: "code",
      scope: "channel:read:stream_key",
    }).toString();
    const url = process.env.TWICH_BASE_URL + "?" + params;
    req.session.email = req.userEmail;
    res.redirect(url);
  } catch (err) {
    console.log("error from twitch auth:", err.message);
  }
};

const twitchOauthCallback = async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await getAccessToken(code);
    const accessToken = tokenResponse.data.access_token;
    console.log("access token:", accessToken);
    console.log("req session", req.session.email)
    //save this in mongo db
    const user_id = await getUserId(accessToken); //not required
    console.log("user id:", user_id);
    //save user id
    const stream_key = await getStreamKey(accessToken, user_id);
    const rtmp_url = "rtmp://live.twitch.tv/app/" + stream_key;
    const rtmp = {
      twitch_rtmp: rtmp_url,
    }; 
    await User.findOneAndUpdate(
      {
        _id: req.session.email,
      },
      {
        $set: {
          "twitch.userId": user_id,
          "twitch.rtmpUrl": rtmp_url,
          "twitch.streamKey": stream_key,
        },
      }
    )
      .then((response) => {})
      .catch((err) => {
        console.error(err);
      });

    res.send(`
    <script>
      window.opener.postMessage(${JSON.stringify(
        rtmp
      )},'https://livenex.online');
      window.close();
    </script>
  `);
  } catch (err) {
    console.log("error from twitch callback:", err.message);
  }
};

const getRTMPTwitch =async(req,res)=>{
    try {
      const data = await User.findOne({ _id: req.userEmail });
      res.status(200).json(data.twitch.rtmpUrl);
    } catch (err) {
      console.error(err.message);
      res.status(400).json("no rtmpurl");
    }
}

export { twitchAuth, twitchOauthCallback, getRTMPTwitch };
