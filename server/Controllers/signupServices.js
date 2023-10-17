import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
const saltRounds = process.env.SALT_ROUNDS || 10;
function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}
const otp = generateOTP();

const sendMail = (email, otp, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "clubofabhimanue@gmail.com",
      pass: "wtowedoazweumtqw",
    },
  });
  console.log("email and otp are ", email, otp);

  const mailOptions = {
    from: "clubofabhimanue@gmail.com",
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  };

  // send the email-

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error.message);
      res.status(400).json({ error: "invalid email" });
    } else {
      console.log("Email sent:" + info.response);
      res.status(200).json({ success: info.response });
    }
  });
};

const signup = async (req, res) => {
  try {
    const { email, password, OTP } = req.body;
    if (otp !== OTP) {
      res.status(400).json({ otpErr: "invalid otp" });
      return;
    }
    const userExits = await User.findOne({ email });
    if (userExits) {
      res.status(400).json({ userExists: "user exists" });
      return;
    } else {
      bcrypt
        .hash(password, 10)
        .then(async function (hash) {
          const user = await User.create({ email, password: hash });
          if (user) {
            res.status(201).json({ message: user });
            return;
          } else {
            res.status(400).json("invalid user data");
            return;
          }
        })
        .catch((err) => {
          console.error(err.message);
          if (err) throw err;
        });
    }
  } catch (err) {
    console.error(err.message);
    if (err) throw err;
  }
};
const getOtp = (req, res) => {
  try {
    const email = req.body.email;

    sendMail(email, otp, res);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
export { signup, getOtp };
