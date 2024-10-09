import { body, param, validationResult, check } from "express-validator";

//validate handler
const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((e) => e.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  return next(new Error(errorMessages));
};

//user
const userRegisterValidator = () => [
  body("name", "Please enter your name").notEmpty(),
  body("email", "Please enter your email").notEmpty(),
  body("password", "Please enter your password").notEmpty(),
  body("bio", "Please enter your bio").notEmpty(),
];

const userLoginValidator = () => [
  body("email", "Please enter your email").notEmpty(),
  body("password", "Please enter your password").notEmpty(),
];

//chats
const newGroupChatValidator = () => [
  body("name", "Please enter your name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be between 2-100"),
];

const addMembersValidator = () => [
  body("members")
    .notEmpty()
    .withMessage("Please enter Members")
    .isArray({ min: 1, max: 30 })
    .withMessage("Cannot add members upto 30 at a time"),
  body("chatId", "Please enter chatId").notEmpty(),
];

const removeMemberValidator = () => [
  body("chatId", "Please enter chatId").notEmpty(),
  body("userId", "Please enter userId whom you want to remove").notEmpty(),
];

const leaveGroupValidator = () => [
  param("chatId", "Please enter chatId").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please enter chatId").notEmpty(),
  // body("files")
  //   .notEmpty()
  //   .withMessage("Please upload attachments")
  //   .isArray({ min: 1, max: 5 })
  //   .withMessage("Max 5 attachments could be sent at a time"),
];

const getChatDetailsValidator = () => [
  param("chatId", "Please enter chatId").notEmpty(),
];

const renameGroupValidator = () => [
  param("chatId", "Please enter chatId").notEmpty(),
  body("name", "Please enter name").notEmpty(),
];

const deleteChatValidator = () => [
  param("chatId", "Please enter chatId").notEmpty(),
];

const getMessagesValidator = () => [
  param("chatId", "Please enter chatId").notEmpty(),
];

const sendFriendRequestValidator = () => [
  body("receiverId", "Please enter receiverId").notEmpty(),
];

const acceptFriendRequestValidator = () => [
  body("requestId", "Please enter requestID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please enter accept")
    .isBoolean()
    .withMessage("Accept must be a Boolean value"),
];

const getMyFriendsValidator = () => [
  body("chatId", "Please provide chatId").notEmpty(),
];

//admin
const adminLoginValidator = () => [
  body("secretKey", "No key is found, Enter your key").notEmpty(),
];

export {
  userRegisterValidator,
  userLoginValidator,
  validateHandler,
  newGroupChatValidator,
  addMembersValidator,
  removeMemberValidator,
  leaveGroupValidator,
  sendAttachmentsValidator,
  getChatDetailsValidator,
  renameGroupValidator,
  deleteChatValidator,
  getMessagesValidator,
  sendFriendRequestValidator,
  acceptFriendRequestValidator,
  getMyFriendsValidator,
  adminLoginValidator,
};
