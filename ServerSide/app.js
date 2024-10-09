import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import { v4 as uuid } from "uuid";

import { errorMiddlewre } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import { v2 as cloudinary } from "cloudinary";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
const PORT = process.env.PORT ?? 8000;

import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/isAuth.js";
import { messageModel } from "./models/message.js";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

export const userSocketIDS = new Map();

connectDB(process.env.DATABASE_URI);

//All middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello!");
});

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (err) => {
    await socketAuthenticator(err, socket, next);
  });
});

io.on("connection", (socket) => {
  // console.log(`User connected with socket id: ${socket.id}`);

  userSocketIDS.set(socket.user._id.toString(), socket.id);

  //listener, when user sends message from frontend NEW_MESSAGE will get triggered
  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: socket.user._id,
        name: socket.user.name,
      },
      chatId: chatId,
      createdAt: new Date().toISOString(),
    };
    const membersSockets = getSockets(members);

    io.to(membersSockets).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId });
    const messageForDB = {
      content: message,
      sender: socket.user._id,
      chat: chatId,
    };

    try {
      await messageModel.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected!");
    userSocketIDS.delete(socket.user._id.toString());
  });
});

app.use(errorMiddlewre);

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
