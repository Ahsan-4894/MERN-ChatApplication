import { userModel } from "../models/user.js";
import { chatModel } from "../models/chat.js";
import { messageModel } from "../models/message.js";
import jwt from 'jsonwebtoken'

class AdminController {
    //admin login
  static login = async (req, res, next) => {
    try {
        const {secretKey} = req.body;
        const isMatched = secretKey === process.env.ADMIN_SECRET_KEY;
        if(!isMatched) return next(new Error("Admin area, You cant Enter :))"));

        const token = jwt.sign({secretKey}, process.env.JWT_SECRET_KEY, {expiresIn:"30d"});

        res.status(200).cookie("admin", token).json({
            success: true,
            message: "Admin login successful",
        })
    } catch (error) {
      next(error);
    }
  };

  //admin logout
  static logout = async (req, res, next) => {
    try {
        res.clearCookie("admin");
        res.status(200).json({
            success: true,
            message: "Admin Logged Out Successfully",
        })
    } catch (error) {
      next(error);
    }
  };

  
  static getAdminData = async(req, res, next)=>{
    return res.status(200).json({admin: true})
  }
  //get all users from db
  static getAllUsers = async (req, res, next) => {
    try {
      //get all users from db
      const users = await userModel.find();
      const transformedUsers = await Promise.all(
        users.map(async ({ avatar, name, _id }) => {
          //get all those chats in which _id is a friend of him and then counts it
          const [totalFriendsOfHim, totalGroupsInWhichHeIsIn] =
            await Promise.all([
              chatModel.countDocuments({
                groupChat: false,
                members: { $in: [_id] },
              }),
              chatModel.countDocuments({
                groupChat: true,
                members: { $in: [_id] },
              }),
            ]);

          return {
            _id,
            name,
            avatar: avatar.url,
            friends: totalFriendsOfHim,
            groups: totalGroupsInWhichHeIsIn,
          };
        })
      );

      res.status(200).json({
        success: true,
        transformedUsers,
      });
    } catch (error) {
      next(error);
    }
  };

  //get all chats records
  static getAllChats = async (req, res, next) => {
    try {
      const chats = await chatModel
        .find()
        .populate("creator", "name avatar")
        .populate("members", "name avatar");

      const transformedChats = await Promise.all(
        chats.map(async ({ _id, name, groupChat, creator, members }) => {
          const totalMessages = await messageModel.find({ chat: _id });

          return {
            _id,
            name,
            groupChat,
            avatar: members.slice(0, 3).map((member) => member.avatar.url),
            members: members.map(({ _id, name, avatar }) => ({
              _id,
              name,
              avatar: avatar.url,
            })),
            creator: {
              name: creator?.name || "none",
              avatar: creator?.avatar.url || "",
            },
            totalMembers: members.length,
            totalMessages,
          };
        })
      );
      res.status(200).json({
        success: true,
        chats: transformedChats,
      });
    } catch (error) {
      next(error);
    }
  };

  //get all messages
  static getAllMessages = async (req, res, next) => {
    try {
      const messages = await messageModel
        .find({})
        .populate("sender", "name avatar")
        .populate("chat", "groupChat");

      const transformedMessages = messages.map(
        ({ _id, attachments, content, chat, sender, createdAt }) => {
          return {
            _id,
            attachments,
            content,
            chatID: chat._id,
            groupChat: chat.groupChat,
            sender: {
              _id: sender._id,
              name: sender.name,
              avatar: sender.avatar.url,
            },
          };
        }
      );

      res.status(200).json({
        success: true,
        messages: transformedMessages,
      });
    } catch (error) {
      next(error);
    }
  };

  //get dashboard data
  static getDashboardStats = async (req, res, next) => {
    try {
      const [totalChats, groupChats, totalUsers, totalMessages] =
        await Promise.all([
          chatModel.countDocuments(),
          chatModel.countDocuments({ groupChat: true }),
          userModel.countDocuments(),
          messageModel.countDocuments(),
        ]);

      //get last 7 days messages
      const today = new Date();
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const last7DaysMessages = await messageModel
        .find({
          createdAt: {
            $gte: last7Days,
            $lte: today,
          },
        })
        .select("createdAt");

      const messages = new Array(7).fill(0);

      last7DaysMessages.forEach((message) => {
        const dayInMiliSeconds = 1000 * 60 * 60 * 24;
        const approxIndex =
          (today.getTime() - message.createdAt.getTime()) / dayInMiliSeconds;
        const index = Math.floor(approxIndex);
        messages[6 - index] += 1;
      });

      res.status(200).json({
        success: true,
        totalChats,
        totalUsers,
        totalMessages,
        groupChats,
        singleChats: totalChats - groupChats,
        messagesChart: messages,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;
