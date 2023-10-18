import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import generateToken from "../middileware/generateToken.js";
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(
  new Strategy(
    {
      clientID: process.env.GCLIENTID,
      clientSecret: process.env.GCLIENTSECRET,
      callbackURL: process.env.CALLBACKURLAUTH,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
//login code
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.json({ error: "please create an acccount" });
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then(function (result) {
          if (result) {
            generateToken(res, user._id);
            res.status(200).json({ message: result, user });
          } else {
            res.status(200).json("invalid password");
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err) throw err;
        });
    }
  } catch (err) {
    if (err) throw err;
    res.json(err.message);
  }
};
//google Oauth
const Oauth = async (req, res) => {
  try {
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res);
  } catch (err) {
    if (err) throw err;
  }
};

//google auth callback
const googleCallBack = (req, res) => {
  try {
    passport.authenticate(
      "google",
      { failureRedirect: "/" },
      async (err, user) => {
        if (err) {
          return res.status(500).json("Authentication failed");
        }
        if (!user) {
          return res.status(401).json("User not authenticated");
        }

        const email = user.email;
        const userExits = await User.findOne({ email });

        if (userExits) {
          generateToken(res, userExits._id);
          res.send(`
          <script>
            window.opener.postMessage(${JSON.stringify(
              user
            )}, 'https://livenex.online/');
            window.close();
          </script>
        `);
        } else {
          const newUser = await User.create({ email });
          if (newUser) {
            generateToken(res, newUser._id);
            res.status(200).json("authenticated");
          } else {
            res.status(400).json("invalid user data");
          }
        }
      }
    )(req, res);
  } catch (err) {
    if (err) throw err;
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie("connect.sid", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json("user logged out successfully");
  } catch (err) {
    if (err) throw err;
  }
};

//retriveing user details

const getUserDetails = async (req, res) => {
  const userDetails = await User.findById(req.body.userId).select("-password");
  if (userDetails) {
    res.status(200).json(userDetails);
  } else {
    res.status(400).json("invalid");
  }
};

export { login, Oauth, googleCallBack, logout, getUserDetails };
