import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";

export const connectDB = async (DATABASE_URI) => {
  try {
    await mongoose.connect(DATABASE_URI, { dbName: "ChatApp" });
    console.log("connected to MONGODB!");
  } catch (error) {
    console.log(error);
  }
};

export const sendToken = async (res, user, statusCode, message) => {
  try {
    const token = jwt.sign({ ID: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    res
      .status(statusCode)
      .cookie("loggedUser", token, {
        httpOnly: true,
        // secure: true,
        // samesite: "none",
        // expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //In 1 day it will expires
      })
      .json({
        success: true,
        message,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Token sending error",
    });
  }
};

export const emitEvent = async (req, event, users, data) => {
  const io = req.app.get("io");
  const socketIDS = getSockets(users);
  io.to(socketIDS).emit(event, data);
};

export const deleteFilesFromCloud = async (allPublicIds) => {
  //delete all files from cloudinary
  console.log("All files from cloudinary has been deleted!");
};

export const uploadFileToCloudinary = async (file = []) => {
  //upload it to cloudinray

  const uploadAllFilesPromises = file.map(async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadAllFilesPromises);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (error) {
    console.log(error);
  }
};
