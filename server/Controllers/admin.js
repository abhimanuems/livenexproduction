import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
import { generateAdminToken } from "../middileware/generateToken.js";
import User from "../models/userModels.js";
const adminLogin = (req, res) => {
  try {
    const { userName, password } = req.body;
    if (
      userName === process.env.adminUserName &&
      password === process.env.adminPassword
    ) {
      generateAdminToken(res, userName);
      res
        .status(200)
        .json({ message: "login successfull", adminUserName: userName });
    } else {
      res.status(400).json({ error: "invalid username or password" });
    }
  } catch (err) {
    console.error(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    console.error(err.message);
  }
};

const banUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.updateOne({ _id: userId }, { status: false });
    res.status(200).json({ message: "baned successfully", userId });
  } catch (err) {
    console.error(err, message);
    res.status(400).json({ message: "internal error" });
  }
};
const unblock = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.updateOne({ _id: userId }, { status: true });
    res.status(200).json({ message: "unblock successfull", userId });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: "internal error" });
  }
};

const subscriptionsDetails = async (req, res) => {
  try {
    const date = new Date();
    const subscriptions = await User.find({ "razorpayDetails.success": true });
    res.status(200).json({ subscriptions });
  } catch (err) {
    console.error(err.message);
  }
};

const tickets = async (req, res) => {
  try {
    User.aggregate([
      {
        $match: {
          tickets: { $ne: [] },
        },
      },
      {
        $project: {
          tickets: 1,
          _id: 0,
        },
      },
    ])
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (err) {
    console.log("error at admin ticket", err.message);
    res.status(400).json({ error: "error at fetching" });
  }
};

const sendMail = (email, subject, reply, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "clubofabhimanue@gmail.com",
      pass: "wtowedoazweumtqw",
    },
  });

  const mailOptions = {
    from: "clubofabhimanue@gmail.com",
    to: email,
    subject: `replt ${subject}`,
    text: reply,
  };

  // send the email-

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
      res.status(400).json({ error: "invalid email" });
    } else {
      res.status(200).json({ success: info.response });
    }
  });
};

const ticketResolve = async (req, res) => {
  try {
    const email = req.body.data.email;
    const subject = req.body.data.subject;
    const replyMessage = req.body.data.replyMessage;
    const id = req.body.data.id;

    User.findOneAndUpdate(
      {
        email: email,
        tickets: {
          $elemMatch: { _id: id },
        },
      },
      {
        $set: { "tickets.$.status": true },
      },
      { new: true }
    )
      .then((response) => {
        res.status(200).json({ response });
      })
      .catch((err) => {
        console.log(err);
      });
    sendMail(email, subject, replyMessage, res);
  } catch (err) {
    console.error(err.message);
    res.status(400).json("internal error");
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("adminjwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json("admin logged out successfully");
  } catch (err) {
    console.error(err.message);
    res.status(400).json("internal error");
  }
};

export {
  adminLogin,
  getUsers,
  banUser,
  unblock,
  subscriptionsDetails,
  tickets,
  ticketResolve,
  logout,
};
