import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import chatController from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
  addMembersValidator,
  deleteChatValidator,
  getChatDetailsValidator,
  getMessagesValidator,
  leaveGroupValidator,
  newGroupChatValidator,
  removeMemberValidator,
  renameGroupValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
const route = express.Router();

//protected routes
route.use(isAuthenticated);
route.post(
  "/newgroupchat",
  newGroupChatValidator(),
  validateHandler,
  chatController.newGroupChat
);
route.get("/mychats", chatController.getMyChats);
route.post("/mygroups", chatController.getMyGroups);
route.put(
  "/addmembers",
  addMembersValidator(),
  validateHandler,
  chatController.addMembers
);
route.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  chatController.removeMember
);
route.delete(
  "/leavegroup/:chatId",
  leaveGroupValidator(),
  validateHandler,
  chatController.leaveGroup
);

route.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  chatController.sendAttachments
);

//route chaining
route
  .route("/:chatId")
  .get(
    getChatDetailsValidator(),
    validateHandler,
    chatController.getChatDetails
  )
  .put(renameGroupValidator(), validateHandler, chatController.renameGroup)
  .delete(deleteChatValidator(), validateHandler, chatController.deleteChat);

route.get(
  "/message/:chatId",
  getMessagesValidator(),
  validateHandler,
  chatController.getMessages
);

export default route;
