import { ArrowCircleRight as ArrowCircleRightIcon } from "@mui/icons-material";
import { IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatList from "../components/specifics/ChatList.jsx";
import ProfileCard from "../components/specifics/ProfileCard.jsx";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";
import { useMyChatsQuery } from "../redux/api/api.js";
import {
  incrementNotificationCount,
  resetNotificationCount,
} from "../redux/reducers/chat.js";

import { getSocket } from "../socket.jsx";
import Header from "./Header.jsx";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../constants/events.js";

const AppLayout = () => (Component) => {
  return (props) => {
    const dispatch = useDispatch();

    const { chatID } = useParams();
    const [isFront, setIsFront] = useState(false);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    const { user } = useSelector((state) => state.auth);
    const socket = getSocket();

    //custom hook to handle errors
    useErrors([{ isError, error }]);

    const setToShowFront = () => {
      setIsFront(!isFront);
    };
    const newMessaggeAlertHandler = useCallback(() => {}, []);

    const newRequestAlertHandler = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);
    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessaggeAlertHandler,
      [NEW_REQUEST]: newRequestAlertHandler,
    };
    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Header />
        <div className="flex justify-between ">
          {/* Whole chats (those who are friends with me) */}
          <div className="rounded-lg h-screen w-[30rem] overflow-auto">
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatID={chatID}
                newMessagesAlert={[
                  { chatID: "2", count: 5 },
                  { chatID: "1", count: 15 },
                  { chatID: "3", count: 12 },
                ]}
                onlineUsers={["1", "2", "3"]}
              />
            )}
          </div>
          {/* Whole chats (those who are friends with me) */}

          {/* Load that chat whom I wanted to talk */}
          <div className="bg-stone-100 h-screen w-[55rem] overflow-auto">
            <Component {...props} chatId={chatID} user={user} />
          </div>
          {/* Load that chat whom I wanted to talk */}

          {/* My Profile */}
          <div className="flex flex-col justify-center items-center rotate-y-180 rounded-md bg-slate-800 h-[50rem] w-[35rem]">
            {isFront ? (
              <ProfileCard user={user} />
            ) : (
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ height: "20rem" }}
              >
                <IconButton color="primary" onClick={setToShowFront}>
                  <ArrowCircleRightIcon
                    sx={{ height: "10rem", width: "10rem" }}
                  ></ArrowCircleRightIcon>
                </IconButton>
                <Typography variant="h4">Show Profile...</Typography>
              </Stack>
            )}
          </div>
          {/* My Profile */}
        </div>
      </>
    );
  };
};

export default AppLayout;
