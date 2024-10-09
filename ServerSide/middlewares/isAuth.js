import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { loggedUser } = req.cookies;

    if (!loggedUser)
      return next(
        new Error("Please login to access this role! (No token found)")
      );

    const { ID } = jwt.verify(loggedUser, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(ID).select("-password");

    if (!user) return next(new Error("Token has been modified!!"));

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    const encodedSecretKey = req.cookies.admin;

    if (!encodedSecretKey)
      return next(new Error("Only admins can access this route!"));

    const decodedSecretKey = jwt.verify(
      encodedSecretKey,
      process.env.JWT_SECRET_KEY
    );

    const actualSecretKey = process.env.ADMIN_SECRET_KEY;

    const isMatched = actualSecretKey === decodedSecretKey.secretKey;

    if (!isMatched)
      return next(new Error("Only Admins can access this route!"));

    next();
  } catch (error) {
    next(error);
  }
};

export const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next("Please login to access this route!");
    const encodedToken = socket.request.cookies.loggedUser;
    if (!encodedToken) return next("Please login to access this route!");

    const { ID } = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(ID);
    if (!user) return next("Please login to access this route!");

    socket.user = user;
    return next();
  } catch (error) {
    console.log(error);
    next("Please login to access this route!");
  }
};
