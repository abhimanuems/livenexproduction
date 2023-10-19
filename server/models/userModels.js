import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: false,
    },
    status: String,
    razorpayDetails: {
      orderId: String,
      paymentId: String,
      signature: String,
      success: Boolean,
      startDate: Date,
      endDate: Date,
    },
    facebook: {
      authorizationCode: String,
      accessToken: String,
      rtmpUrl: String,
      liveVideoId: String,
    },
    youtube: {
      broadcastId: String,
      authorizeToken: String,
      rtmpUrl: String,
      liveVideoId: String,
      liveChatId: String,
    },
    twitch: {
      userId: String,
      rtmpUrl: String,
      streamKey: String,
      
    },
    tickets: [
      {
        email: String,
        subject: String,
        description: String,
        status: Boolean,
      },
    ],
    streams: [
      {
        title: String,
        startTime: Date,
        destinations: Array,
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
