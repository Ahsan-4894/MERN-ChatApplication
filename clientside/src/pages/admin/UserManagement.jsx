import React, { useEffect, useState } from "react";

import AdminLayout from "../../layout/AdminLayout";
import Table from "../../components/specifics/Table";
import { Avatar } from "@mui/material";
import {dashboardManagementData} from '../../constants/sampleChatData.js'
import {TransformImage} from '../../lib/features.js'

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
    renderCell : (params)=>(<Avatar alt={params.row.name} src={params.row.avatar}/>)
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150,
  },

];


const UserManagement = () => {
  useEffect(()=>{
    setRows(dashboardManagementData.users.map((user)=>({...user, id:user._id, avatar:TransformImage(user.avatar)})));
  }, [])
  
  const [rows, setRows] = useState([]);

  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} rowHeight={52} heading={"All Users"} />
    </AdminLayout>
  );
};

export default UserManagement;
