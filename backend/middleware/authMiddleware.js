import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.bearer) {
      try {
        token = req.headers.bearer;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
      } catch (error) {
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      throw new Error("Not Authorized, no Token");
    }

    // next if no errors
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const admin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      throw new Error("Not authorized as an Admin");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const declineDemo = (req, res, next) => {
  try {
    // disable demo user & ad
    if (
      req.user &&
      (req.user._id.equals(process.env.Demo_User_ID) ||
        req.user._id.equals(process.env.Demo_Admin_ID))
    ) {
      throw new Error(
        "Demo User don't have permission for current operation. Try create an account"
      );
    }
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export { protect, admin, declineDemo };
