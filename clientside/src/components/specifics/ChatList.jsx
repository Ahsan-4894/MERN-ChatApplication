import React from "react";
import ChatItem from "./ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatID,
  onlineUsers = [],
  newMessagesAlert = [{ chatID: "1", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <div className="flex flex-col overflow-auto h-screen">
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatID }) => chatID === _id
        );
        const isOnline = members?.some((member) => onlineUsers.includes(_id));
        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={_id == chatID}
            handleDeleteChatOpen = {handleDeleteChat}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
