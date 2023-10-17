import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/userModels.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const razorpay = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZARPAY_KEY_ID,
      key_secret: process.env.RAZARPAY_KEY_SECRET,
    });

    const options = {
      amount: 1999 * 100,
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (err) {
    if (err) throw err;
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const successFunction = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      email,
    } = req.body;

    const shasum = crypto.createHmac("sha256", "9f8327fvCnjWCAj0mpp8uNJB");
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg_error: "Transaction not legit!" });
    const startDate = Date.now();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 28);
    const razorpayDetails = {
      endDate: endDate,
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
      success: true,
      startDate: Date.now(),
    };

    try {
      const user = await User.findOneAndUpdate(
        {
          email: req.body.email,
        },
        { $set: { razorpayDetails: razorpayDetails } }
      );
    } catch (err) {
      console.error(err.message);
      throw err;
    }

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

const checkSubscription = async (req, res) => {
  try {
    const subscription = await User.findOne({ _id: req.userEmail });
    let subscribedDate = subscription?.razorpayDetails?.startDate;
    const today = new Date();
    subscribedDate?.setDate(subscribedDate?.getDate() + 28);
    if (today <= subscribedDate) res.status(200).json(true);
    else res.status(200).json(false);
  } catch (err) {
    console.error(err.message);
  }
};

const submitTickets = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.userEmail },
      { $push: { tickets: req.body } }
    )
      .then((response) => {
        res.status(200).json({ message: "successful submit the ticket" });
      })
      .catch((err) => {
        res.status(400).json({ error: "ticket failed" });
      });
  } catch (err) {
    console.error("error at submitting tickets", err);
    res.status(400).json({ err });
  }
};

const getTicketData = async (req, res) => {
  try {
    const userId = req.userEmail;
    User.find({ _id: userId }, { tickets: 1, _id: 0 })
      .then((response) => {
        res.status(200).json({ response: response[0]?.tickets });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ err });
      });
  } catch (err) {
    console.error("error at fetching tickets", err);
    res.status(400).json({ error: "error at fetching datas" });
  }
};

export {
  razorpay,
  successFunction,
  checkSubscription,
  submitTickets,
  getTicketData,
};
