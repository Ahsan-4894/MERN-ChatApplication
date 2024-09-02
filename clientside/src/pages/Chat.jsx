import React from "react";
import AppLayout from "../layout/AppLayout.jsx";
import { IconButton, Stack, TextField } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import FileMenu from "../dialogs/FileMenu.jsx";
import { sampleMessages } from "../constants/sampleChatData.js";
import MessageComponent from "../components/specifics/MessageComponent.jsx";
const Chat = () => {
  const user = {
    _id:"Asdasda",
    name:"Ahsan"
  };

  return (
    <>
      <Stack
        height={"80%"}
        bgcolor={"rgb(245 245 250)"}
        sx={{
          overflowX: "none",
          overflowY: "auto",
        }}
      >
        {/* Messages */}
        {
          sampleMessages.map((mssg, index)=>(
            <MessageComponent key={index} message={mssg} user={user}/>
          ))
        }
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <IconButton sx={{
          rotate:"30deg",
          height:'3rem',
          marginTop:'1.5rem',

        }}>
          <AttachFileIcon />
        </IconButton>
        <TextField placeholder="Enter Message" id="outlined-basic" variant="outlined" sx={{
          width:"50rem",
          overflowY:"auto",
          marginTop:"1rem"
        }} />
        <IconButton sx={{
          rotate:"-30deg",
          marginTop:"1rem"
        }}>
          <SendIcon />
        </IconButton>
        <FileMenu />
      </Stack>
    </>
  );
};
export default AppLayout()(Chat);
