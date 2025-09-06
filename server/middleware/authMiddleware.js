import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** Wrap async route handlers */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/** Verify JWT from Authorization: Bearer <token> or cookie token */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    const err = new Error("Not authorized, token missing");
    err.statusCode = 401;
    throw err;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      const err = new Error("User not found");
      err.statusCode = 401;
      throw err;
    }
    next();
  } catch (e) {
    e.statusCode = 401;
    e.message = "Not authorized, token invalid";
    throw e;
  }
});

/** Check role(s) */
export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const err = new Error("Forbidden");
      err.statusCode = 403;
      throw err;
    }
    next();
  };
