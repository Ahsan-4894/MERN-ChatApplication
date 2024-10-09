import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack, TextField } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MessageComponent from "../components/specifics/MessageComponent.jsx";
import { NEW_MESSAGE } from "../constants/events.js";
import FileMenu from "../dialogs/FileMenu.jsx";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";
import AppLayout from "../layout/AppLayout.jsx";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api.js";
import { getSocket } from "../socket.jsx";

import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc.js";

const Chat = ({ chatId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileAnchor, setFileAnchor] = useState(null);

  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.data?.chat?.members;

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page, skip: !chatId });

  const errors = [
    {
      isError: chatDetails.isError,
      error: chatDetails.error,
    },
    {
      isError: oldMessagesChunk.isError,
      error: oldMessagesChunk.error,
    },
  ];

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessaggesHandler = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, []);
  useEffect(() => {
    return () => {
      setMessage("");
      setMessages([]);
      setPage(1);
      setOldMessages([]);
    };
  }, [chatId]);

  const eventHandlers = { [NEW_MESSAGE]: newMessaggesHandler };
  useSocketEvents(socket, eventHandlers);

  useErrors(errors);
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
  );

  const allMessages = [...oldMessages, ...messages];

  const handleFileOpen = (e) => {
    e.preventDefault();
    dispatch(setIsFileMenu(true));
    setFileAnchor(e.currentTarget);
  };

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        height={"80%"}
        bgcolor={"rgb(245 245 250)"}
        sx={{
          overflowX: "none",
          overflowY: "auto",
        }}
      >
        {/* Messages */}
        {allMessages?.map((mssg, index) => (
          <MessageComponent key={index} message={mssg} user={user} />
        ))}
      </Stack>

      <form
        style={{
          width: "90%",
        }}
        onSubmit={sendMessageHandler}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <IconButton
            sx={{
              rotate: "30deg",
              height: "3rem",
              marginTop: "1.5rem",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <TextField
            placeholder="Enter Message"
            id="outlined-basic"
            variant="outlined"
            sx={{
              width: "50rem",
              overflowY: "auto",
              marginTop: "1rem",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            sx={{
              rotate: "-30deg",
              marginTop: "1rem",
            }}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Stack>
        <IconButton>
          <FileMenu anchorE1={fileAnchor} chatId={chatId} />
        </IconButton>
      </form>
    </>
  );
};
export default AppLayout()(Chat);
