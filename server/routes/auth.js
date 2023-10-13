import { Router } from "express";
import {
  login,
  Oauth,
  googleCallBack,
  getUserDetails,
  logout,
} from "../Controllers/loginServices..js";
import { signup, getOtp } from "../Controllers/signupServices.js";

const authRouter = Router();
authRouter.post("/login", login);

authRouter.post("/signup", signup);

authRouter.post("/details", getUserDetails);

authRouter.get("/google", Oauth);

authRouter.get("/google/callback", googleCallBack);

authRouter.post("/otp", getOtp);

authRouter.get("/logout", logout);

export default authRouter;
