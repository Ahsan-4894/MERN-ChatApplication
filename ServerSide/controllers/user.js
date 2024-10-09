import { userModel } from "../models/user.js";
import { chatModel } from "../models/chat.js";
import { requestModel } from "../models/request.js";

import bcrypt from "bcrypt";
import {
  emitEvent,
  sendToken,
  uploadFileToCloudinary,
} from "../utils/features.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

import { getOtherMembers } from "../lib/helper.js";
class userController {
  // static faltu = async (req, res, next) => {
  //   const user = {
  //     _id: "1234",
  //   };
  //   sendToken(res, user, 201, "Token has been set!");
  // };
  //login and store it in token

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) return next(new Error("User not found"));

      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) return next(new Error("Inavalid credentials"));

      sendToken(res, user, 200, `Login Successful ${user.name}`);
    } catch (error) {
      next(error);
    }
  };

  //register
  static register = async (req, res, next) => {
    const { name, email, password, bio } = req.body;
    try {
      const file = req.file;
      if (!file) return next(new Error("Please upload a profile picture"));

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await uploadFileToCloudinary([file]);

      const avatar = {
        publicid: result[0].public_id,
        url: result[0].url,
      };

      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        bio,
        avatar,
      });
      sendToken(res, user, 201, "Registered Successfully");
    } catch (error) {
      next(error);
    }
  };

  //get my profile
  static getMyProfile = async (req, res, next) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  };

  //logout
  static logout = async (req, res, next) => {
    try {
      res.clearCookie("loggedUser");
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //search users who are not my friends
  static searchUsers = async (req, res, next) => {
    try {
      const { name = "" } = req.query;

      //all users whom i chatted with at least once means they are ny friends
      const myChats = await chatModel.find({
        groupChat: false,
        members: { $in: [req.user._id.toString()] },
      });
      //Ids of those users whom I chatted with along with my ID too
      const allUsersIdsFromMyChats = myChats.map((chat) => chat.members).flat();
      // console.log(allUsersIdsFromMyChats);
      //getting IDs of those users who are not my friends :(
      const allUsersIdsExceptMyFriends = await userModel.find({
        _id: { $nin: allUsersIdsFromMyChats },
        name: { $regex: name, $options: "i" },
      });

      const nonFriendsDetails = allUsersIdsExceptMyFriends.map(
        ({ avatar, _id, name }) => ({
          _id,
          name,
          avatar: avatar.url,
        })
      );
      res.status(200).json({
        success: true,
        message: nonFriendsDetails,
      });
    } catch (error) {
      next(error);
    }
  };

  //send friend request
  static sendFriendRequest = async (req, res, next) => {
    try {
      const { receiverId } = req.body;
      const request = await requestModel.findOne({
        $or: [
          { sender: req.user._id, receiver: receiverId },
          { sender: receiverId, receiver: req.user._id },
        ],
      });

      if (request) return next(new Error("Friend request already sent"));

      await requestModel.create({
        sender: req.user._id,
        receiver: receiverId,
      });

      emitEvent(req, NEW_REQUEST, [receiverId]);

      res.status(200).json({
        success: true,
        message: "Friend request sent successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //accept/reject friend request
  static acceptFriendRequest = async (req, res, next) => {
    try {
      const { requestId, accept } = req.body;

      const request = await requestModel
        .findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name");
      console.log(request);
      if (!request) return next(new Error("Request not found"));

      if (request.receiver._id.toString() !== req.user._id.toString())
        return next(
          new Error("You are not authorized to accept/reject request!")
        );

      if (!accept) {
        await request.deleteOne();
        return res.status(200).json({
          success: true,
          message: "Friend Request Rejected!",
        });
      }
      const members = [
        request.sender._id.toString(),
        request.receiver._id.toString(),
      ];
      await Promise.all([
        chatModel.create({
          name: `${request.sender.name} and ${request.receiver.name}`,
          members,
        }),
        request.deleteOne(),
      ]);

      emitEvent(req, REFETCH_CHATS, members);
      console.log("IN final staging!");
      res.status(200).json({
        success: true,
        message: "Friend added successfully!",
        // senderID: sender._id.toString(),
      });
    } catch (error) {
      next(error);
    }
  };

  //get notifications
  static getMyNotifications = async (req, res, next) => {
    try {
      const requests = await requestModel
        .find({ receiver: req.user._id })
        .populate("sender", "name avatar");

      if (!requests) return next(new Error("No new notifications!"));

      const transformedAllRequests = requests.map(({ _id, sender }) => ({
        _id,
        sender: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar.url,
        },
      }));
      res.status(200).json({ success: true, requests: transformedAllRequests });
    } catch (error) {
      next(error);
    }
  };

  static getMyFriends = async (req, res, next) => {
    try {
      const { chatId } = req.body;

      const chat = await chatModel
        .find({ groupChat: false, members: { $in: [req.user._id] } })
        .populate("members", "name avatar");
      const friends = chat.map(({ members }) => {
        const otherUser = getOtherMembers(members, req.user._id);
        return {
          _id: otherUser._id,
          name: otherUser.name,
          avatar: otherUser.avatar.url,
        };
      });
      if (chatId) {
        const chat = await chatModel.findById(chatId);

        const avaliableFriends = friends.filter(
          (f) => !chat.members.includes(f._id)
        );
        return res.status(200).json({
          success: true,
          friends: avaliableFriends,
        });
      } else {
        return res.status(200).json({
          success: true,
          friends,
        });
      }

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default userController;
