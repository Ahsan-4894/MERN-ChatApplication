import { userSocketIDS } from "../app.js";

export const getOtherMembers = (members = [], userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
};

export const getSockets = (users) => {
  console.log("NORMAL", users);
  console.log("SOCKETS", userSocketIDS);
  const sockets = users.map((user) => userSocketIDS.get(user.toString()));
  console.log("FINAL", sockets);
  return sockets;
};

export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
