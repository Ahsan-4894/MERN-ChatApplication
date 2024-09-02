import React, {useState} from "react";
import Header from "./Header.jsx";
import ChatList from "../components/specifics/ChatList.jsx";
import {sampleChatsData} from "../constants/sampleChatData.js"
import { useParams } from "react-router-dom";
import ProfileCard from "../components/specifics/ProfileCard.jsx";
import { ArrowCircleRight as ArrowCircleRightIcon } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const AppLayout = () => (Component) => {

  return (props) => {
    const {chatID} = useParams();
    const [isFront, setIsFront] = useState(false);
    const setToShowFront = ()=>{
      setIsFront(!isFront);
    }
    console.log(isFront);
    return (
      <>
        <Header />
        <div className="flex justify-between ">
          {/* Whole chats (those who are friends with me) */}
          <div className="rounded-lg h-screen w-[30rem] overflow-auto">
            <ChatList chats={sampleChatsData} chatID={chatID} newMessagesAlert={[{chatID:"2", count:5}, {chatID:"1", count:15}, {chatID:"3", count:12}]} onlineUsers={["1", "2", "3"]}/>
          </div>
          {/* Whole chats (those who are friends with me) */}

          {/* Load that chat whom I wanted to talk */}
          <div className="bg-stone-100 h-screen w-[55rem] overflow-auto">
            <Component {...props} />
          </div>
          {/* Load that chat whom I wanted to talk */}

          {/* My Profile */}
          <div className="flex flex-col justify-center items-center rotate-y-180 rounded-md bg-slate-800 h-[50rem] w-[35rem]">
            {
              isFront ? <ProfileCard /> : <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} sx={{height:"20rem"}}>
                  <IconButton color="primary" onClick={setToShowFront}>
                    <ArrowCircleRightIcon  sx={{height:"10rem", width:"10rem"}}></ArrowCircleRightIcon>
                  </IconButton>
                  <Typography variant="h4">Show Profile...</Typography>
              </Stack>
            }
            
          </div>
          {/* My Profile */}
        </div>
      </>
    );
  };
};

export default AppLayout;
