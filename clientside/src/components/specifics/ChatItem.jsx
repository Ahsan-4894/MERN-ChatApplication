import { Box, styled } from "@mui/material";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <div>
      <Link
        to={`/chat/${_id}`}
        onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
      >
        <div
          className={`duration-300 transition rounded-lg shadow-blue-50 border border-blue-100 flex items-center mt-2 p-2 ${
            sameSender ? `bg-black text-white` : `border shadow-xl  text-black`
          } relative`}
        >
          <AvatarCard avatar={avatar} />
          <div className="flex flex-col">
            <h2 className="font-bold">{name}</h2>
            {newMessageAlert && <h3>{newMessageAlert.count} New Messages</h3>}
          </div>

          {isOnline && (
            <div className="w-[.5rem] h-[.5rem] rounded-full bg-green-800 absolute t-[52%] left-[94%] tranform translate-y-[-50%] " />
          )}
        </div>
      </Link>
    </div>
  );
};

export default memo(ChatItem);
