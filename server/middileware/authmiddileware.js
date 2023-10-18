import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userEmail = decoded.userId;
      next();
    } else {
      res.status(401).json({ error: "Not authorized, no token" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

const adminAuthProtect = async (req, res, next) => {
  try {
    const token = req.cookies.adminjwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.admin = decoded.userId;
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect, adminAuthProtect };
