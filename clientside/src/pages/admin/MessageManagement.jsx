import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { dashboardManagementData } from "../../constants/sampleChatData.js";
import Table from "../../components/specifics/Table";
import {Avatar, Box, IconButton, Stack} from '@mui/material'
import {FileFormat, TransformImage} from '../../lib/features.js'
import moment from "moment";
import { Close as CloseIcon, DoneOutline as DoneOutlineIcon, SpeakerNotesOff as SpeakerNotesOffIcon } from "@mui/icons-material";
import RenderAttachments from "../../components/specifics/RenderAttachments.jsx";

const columns = [
  {
    field: "id",
    headerName: "id",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) =>{
      const {attachments} = params.row;
      return attachments.length > 0 ? 
          attachments.map((i, index)=>{
            const file = FileFormat(i);
            return (
              <Box key={index}>
                <a href={i}
                  download
                  target="_blank"
                  style={{
                    color:"black"
                  }}
                >
                  {RenderAttachments(file, i)}
                </a>
              </Box>
            );
          })
      : 
      <IconButton color='error'>
        <SpeakerNotesOffIcon/>
      </IconButton>
    }
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groupChat",
    headerName: "GroupChat",
    headerClassName: "table-header",
    width: 150,
    renderCell:(params)=>{
      if(params.row.groupChat) return <DoneOutlineIcon color="primary"/>
      return <CloseIcon color='error'/>
    }
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Stack
        direction={"row"}
        spacing={"1rem"}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    headerClassName: "table-header",
    width: 150,
  },
];


const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardManagementData.messages.map((user) => ({
        ...user,
        id: user._id,
        sender:{
          name:user.sender.name,
          avatar:TransformImage(user.sender.avatar)
        },
        createdAt:moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table
        rows={rows}
        columns={columns}
        rowHeight={150}
        heading={"All Messages"}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
