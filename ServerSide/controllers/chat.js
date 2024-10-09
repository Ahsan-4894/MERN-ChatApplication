import { chatModel } from "../models/chat.js";
import { messageModel } from "../models/message.js";
import { userModel } from "../models/user.js";

import {
  deleteFilesFromCloud,
  emitEvent,
  uploadFileToCloudinary,
} from "../utils/features.js";

import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";
class chatController {
  //create new group chat
  static newGroupChat = async (req, res, next) => {
    try {
      const { name, members } = req.body;

      const allMembers = [req.user._id, ...members];

      await chatModel.create({
        name,
        groupChat: true,
        creator: req.user._id,
        members: allMembers,
      });

      emitEvent(
        req,
        ALERT,
        allMembers,
        `${req.user.name} created a group chat`
      );
      emitEvent(req, REFETCH_CHATS, members);

      res.status(200).json({
        success: true,
        message: "Group chat created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //get my chats
  static getMyChats = async (req, res, next) => {
    try {
      const chats = await chatModel
        .find({ members: req.user._id })
        .populate("members", "name email avatar");
      const transformedChats = chats.map(
        ({ _id, name, groupChat, members }) => {
          const otherMember = getOtherMembers(members, req.user._id);
          return {
            _id,
            groupChat,
            name: groupChat ? name : otherMember.name,
            avatar: groupChat
              ? members.slice(0, 3).map(({ avatar }) => avatar.url)
              : [otherMember.avatar.url],
            members: members
              .filter((m) => m._id.toString() !== req.user._id.toString())
              .map((i) => i._id.toString()),
          };
        }
      );

      res.status(200).json({
        success: true,
        chats: transformedChats,
      });
    } catch (error) {
      next(error);
    }
  };

  //get my groups
  static getMyGroups = async (req, res, next) => {
    try {
      const chats = await chatModel
        .find({
          groupChat: true,
          members: req.user._id,
          creator: req.user._id,
        })
        .populate("members", "name email avatar");

      const groups = chats.map(({ _id, name, groupChat, members }) => ({
        _id,
        name,
        groupChat,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
      }));
      res.status(200).json({
        success: true,
        groups,
      });
    } catch (error) {
      next(error);
    }
  };

  //add members to group
  static addMembers = async (req, res, next) => {
    try {
      const { chatId, members } = req.body;
      const chats = await chatModel.findById(chatId);

      if (!chats) return next(new Error("Chat not found!"));

      if (!chats.groupChat) return next(new Error("This is not a group chat!"));

      if (chats.creator.toString() !== req.user._id.toString())
        return next(new Error("Only admins can add members to this group!"));

      const allMembersPromise = members.map((member) =>
        userModel.findById(member).select("name")
      );

      const allNewMembers = await Promise.all(allMembersPromise);

      //filter out unique members just add those who are not rest of the members who are added not add them.
      const uniqueMembers = allNewMembers
        .filter((i) => !chats.members.includes(i._id.toString()))
        .map((i) => i._id);

      chats.members.push(...uniqueMembers);

      if (members.length > 100)
        return next(new Error("Maximum 100 members allowed!"));

      await chats.save();

      const allMembersName = allNewMembers.map(({ name }) => name);
      emitEvent(
        req,
        ALERT,
        chats.members,
        `${allMembersName.join(",")} added to this group chat`
      );
      emitEvent(req, REFETCH_CHATS, chats.members);

      res.status(200).json({
        success: true,
        message: "Members added successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //remove a member from group
  static removeMember = async (req, res, next) => {
    try {
      const { chatId, userId } = req.body;

      const [chat, userToBeRemoved] = await Promise.all([
        chatModel.findById(chatId),
        userModel.findById(userId),
      ]);

      if (!chat) return next(new Error("Chat not found!"));

      if (!userToBeRemoved) return next(new Error("User not found!"));

      if (!chat.groupChat) return next(new Error("This is not a group chat!"));

      if (chat.creator.toString() !== req.user._id.toString())
        return next(
          new Error("Only admins can remove members from this group!")
        );

      if (chat.members.length <= 3)
        return next(new Error("Minimum 3 members should be in the group!"));

      chat.members = chat.members.filter(
        (i) => i.toString() !== userId.toString()
      );

      await chat.save();

      emitEvent(
        req,
        ALERT,
        chat.members,
        `${userToBeRemoved.name} removed from this group chat`
      );
      emitEvent(req, REFETCH_CHATS, chat.members);

      res.status(200).json({
        success: true,
        message: "Member removed successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //leave group
  static leaveGroup = async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const chat = await chatModel.findById(chatId);
      if (!chat) return next(new Error("Chat not found!"));

      if (!chat.groupChat) return next(new Error("This is not a group chat!"));

      //what if admin leaves the group so make another member of group as an admin
      const remainingMembers = chat.members.filter(
        (i) => i.toString() !== req.user._id.toString()
      );

      if (remainingMembers.length < 3)
        return next(new Error("Minimum 3 members should be in the group!"));

      if (chat.creator.toString() === req.user._id.toString()) {
        chat.creator = remainingMembers[0];
      }

      chat.members = remainingMembers;
      await chat.save();

      emitEvent(
        req,
        ALERT,
        chat.members,
        `${req.user.name} has left this group chat`
      );
      res.status(200).json({
        success: true,
        message: "Left group successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //send attachments to chat
  static sendAttachments = async (req, res, next) => {
    try {
      const { chatId } = req.body;
      const [chat, myself] = await Promise.all([
        chatModel.findById(chatId),
        userModel.findById(req.user._id),
      ]);

      if (!chat) return next(new Error("Chat not found!"));

      const files = req.files || [];
      if (files.length < 0)
        return next(new Error("Please provide attachments!"));

      //file uploading here
      const attachments = await uploadFileToCloudinary(files);

      const messageForDB = {
        content: "",
        attachments,
        sender: myself._id,
        chat: chatId,
      };
      const messageForRealTime = {
        ...messageForDB,
        sender: {
          _id: myself._id,
          name: myself.name,
        },
      };
      const message = new messageModel(messageForDB);
      await message.save();

      emitEvent(req, NEW_MESSAGE, chat.members, {
        message: messageForRealTime,
        chat: chatId,
      });

      emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });
      res.status(200).json({
        success: true,
        message,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  static getChatDetails = async (req, res, next) => {
    try {
      const { chatId } = req.params;
      if (!chatId) return next(new Error("Provide ChatID!"));

      if (req.query.populate === "true") {
        //after doing lean, "chat" becomes pure js object instead of mongoose object so we can do modifcations on it
        const chat = await chatModel
          .findById(chatId)
          .populate("members", "name avatar")
          .lean();

        if (!chat) return next(new Error("Chat not found!"));

        chat.members = chat.members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        }));

        res.status(200).json({
          success: true,
          chat,
        });
      } else {
        const chat = await chatModel.findById(chatId);
        if (!chat) return next(new Error("Chat not found!"));
        res.status(200).json({
          success: true,
          chat,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  //admin renames the group
  static renameGroup = async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const { name } = req.body;

      const chat = await chatModel.findById(chatId);

      if (!chat) return next(new Error("Chat not found!"));

      if (chat.creator.toString() !== req.user._id.toString())
        return next(
          new Error(
            "You are not authorized to perform this action, Only admins can rename the group!"
          )
        );

      //change prev groups name to new group name
      chat.name = name;

      await chat.save();

      emitEvent(req, REFETCH_CHATS, chat.members);
      res.status(200).json({
        success: true,
        message: "Group renamed successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //delete groupChats, individual chats
  static deleteChat = async (req, res, next) => {
    try {
      const { chatId } = req.params;
      if (!chatId) return next(new Error("Provide ChatID!"));

      const chat = await chatModel.findById(chatId);

      if (!chat) return next(new Error("Chat not found!"));

      const members = chat.members;

      //only admins can delete group chats
      if (chat.groupChat && chat.creator.toString() !== req.user._id.toString())
        return next(
          new Error(
            "You are not authorized to perform this action, Only admins can delete the group chat!"
          )
        );

      //if the user is not a member of the chat how he can delete the chat?
      if (!chat.groupChat && !chat.members.includes(req.user._id.toString()))
        return next(
          new Error("You are not authorized to perform this action!")
        );

      //chat deletion code here also delete all files from cloudinary too
      const messagesWithAttachments = await messageModel.find({
        chat: chatId,
        attachments: { $exists: true, $ne: [] },
      }); //get all attachments

      console.log(messagesWithAttachments);
      const allPublicIds = [];

      messagesWithAttachments.forEach(({ attachments }) =>
        attachments.forEach(({ public_id }) => allPublicIds.push(public_id))
      );

      await Promise.all([
        deleteFilesFromCloud(allPublicIds),
        chat.deleteOne(),
        messageModel.deleteMany({ chat: chatId }),
      ]);

      emitEvent(req, REFETCH_CHATS, members);
      res.status(200).json({
        success: true,
        message: "Chat deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  //get messages

  static getMessages = async (req, res, next) => {
    try {
      const chatId = req.params.chatId;
      const { page = 1 } = req.query;

      const messagePerPage = 20;
      const skip = (page - 1) * messagePerPage;

      const [messages, totalMessageCount] = await Promise.all([
        messageModel
          .find({ chat: chatId })
          .skip(skip)
          .limit(messagePerPage)
          .populate("sender", "name")
          .lean(),

        messageModel.countDocuments({ chat: chatId }),
      ]);
      const totalPages = Math.ceil(totalMessageCount / messagePerPage);
      res.status(200).json({
        success: true,
        messages,
        totalPages,
      });
    } catch (error) {
      next(error);
    }
  };
}
export default chatController;
