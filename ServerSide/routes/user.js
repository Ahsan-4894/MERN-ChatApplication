import express from "express";
import userController from "../controllers/user.js";
import { uploadSingleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

import {
  acceptFriendRequestValidator,
  getMyFriendsValidator,
  sendFriendRequestValidator,
  userLoginValidator,
  userRegisterValidator,
  validateHandler,
} from "../lib/validators.js";

const route = express.Router();

//public routes
route.post(
  "/register",
  uploadSingleAvatar,
  userRegisterValidator(),
  validateHandler,
  userController.register
); //register route
route.post(
  "/login",
  userLoginValidator(),
  validateHandler,
  userController.login
); //login route

// route.get("/faltu", userController.faltu);

//protected routes
route.use(isAuthenticated);
route.get("/me", userController.getMyProfile);
route.get("/logout", userController.logout);

route.get("/search", userController.searchUsers);

route.put(
  "/sendfriendrequest",
  sendFriendRequestValidator(),
  validateHandler,
  userController.sendFriendRequest
);
route.put(
  "/acceptfriendrequest",
  acceptFriendRequestValidator(),
  validateHandler,
  userController.acceptFriendRequest
);
route.get("/notifications", userController.getMyNotifications);

route.get("/myfriends", userController.getMyFriends);

export default route;
