import React, { useEffect, useState } from "react";

import { Avatar, Stack } from "@mui/material";
import AvatarCard from "../../components/specifics/AvatarCard.jsx";
import Table from "../../components/specifics/Table";
import { dashboardManagementData } from "../../constants/sampleChatData.js";
import AdminLayout from "../../layout/AdminLayout";
import { TransformImage } from "../../lib/features.js";

const columns = [
  {
    field: "id",
    headerName: "id",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell : (params)=>(
    <Avatar alt={params.row.name} src={params.row.avatar}/>)
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 150,
    renderCell:(params)=>(
      <AvatarCard avatar={params.row.members} />
    )
  },
  {
    field: "totalMembers",
    headerName: "TotalMembers",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "totalMessages",
    headerName: "TotalMessages",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 150,
    renderCell:(params)=>(
      <Stack direction={"row"} alignItems={"center"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar}/>
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },
  

];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardManagementData.chats.map((chat) => ({
        ...chat,
        id: chat._id,
        avatar: chat.avatar.map((i)=>TransformImage(i)),
        members:chat.members.map((i)=>TransformImage(i.avatar))
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table
        rows={rows}
        columns={columns}
        rowHeight={52}
        heading={"All Chats"}
      />
    </AdminLayout>
  );
};

export default ChatManagement;
