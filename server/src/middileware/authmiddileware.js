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

const verifyToken = (socket, next) => {
  console.log("socket cookie is ",socket.handshake);

  const token = extractJwtToken(socket.handshake.headers.cookie);
  if (!token) {
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    socket.user = decoded;
    next();
  });
};

function extractJwtToken(cookieString) {
  const cookies = cookieString?.split("; ");
  const jwtCookie = cookies?.find((cookie) => cookie.startsWith("jwt="));

  if (jwtCookie) {
    const token = jwtCookie.split("=")[1];
    return token;
  }

  return null;
}


export { protect, adminAuthProtect, verifyToken };
