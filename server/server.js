import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected!")).catch((err)=>console.error(err.message))
import authRouter from "./routes/auth.js";
import service from "./routes/services.js";
import adminRouter from "./routes/admin.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
const app = express();

app.use(
  cors({
    origin: "https://livenex.online/",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "200mb" }));
app.use(
  express.urlencoded({ limit: "200mb", extended: true, parameterLimit: 50000 })
);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", service);
app.use("/admin", adminRouter);



app.listen(process.env.PORTNUMBER, () =>
  console.log(`server started at ${process.env.PORTNUMBER}`)
);
