import { Stack, Typography, Box, IconButton } from "@mui/material";
import React from "react";
import {
  Dashboard as DashboardIcon,
  ExitToApp,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  Logout as LogoutIcon,
  ManageAccounts as ManageAccountsIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { Link, Navigate, NavLink } from "react-router-dom";

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/user-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chat-management",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/message-management",
    icon: <MessageIcon />,
  },
];
const isAdmin =true;
const SideBar = () => {
    const handleLogOutHandler= ()=>{console.log('loggedOut')}

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          marginLeft: "2rem",
          marginBottom: "1rem",
        }}
      >
        AdminEasePanel
      </Typography>
      <Stack>
        {adminTabs.map((tab, index) => (
          <NavLink to={tab.path} >
            <Stack
              sx={{
                bgcolor: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.35)",
                margin: "1rem",
                padding: "1rem",
                transition: "background-color 0.3s, transform 0.3s ease-in-out",
                borderRadius: "10rem",
                ":hover": {
                  color: "gray",
                },
              }}
              direction={"row"}
              textAlign={"center"}
              alignItems={"center"}
              gap={"2rem"}
            >
              <IconButton color="primary">{tab.icon}</IconButton>
              <Typography variant="h6">{tab.name}</Typography>
            </Stack>
          </NavLink>
        ))}

        <NavLink onClick={handleLogOutHandler}>
          <Stack
            sx={{
              bgcolor: "white",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.35)",
              margin: "1rem",
              padding: "1rem",
              transition: "background-color 0.3s, transform 0.3s ease-in-out",
              borderRadius: "10rem",
              ":hover": {
                color: "gray",
              },
            }}
            direction={"row"}
            textAlign={"center"}
            alignItems={"center"}
            gap={"2rem"}
          >
            <IconButton color="primary">
              <ExitToAppIcon />
            </IconButton>
            <Typography variant="h6">LogOut</Typography>
          </Stack>
        </NavLink>

      </Stack>
    </>
  );
};
const AdminLayout = ({ children }) => {
    
     
    if(!isAdmin) return <Navigate to='/admin/login'/>; 
    return (
    
    <Stack direction={"row"} width={"100vw"} height={"100vh"}>
      <Stack
        direction={"column"}
        justifyContent={"space-evenly"}
        alignItems={"space-between"}
        sx={{
          width: "30%",
          height: "100%",
          bgcolor: "lightgray",
        }}
      >
        <Box>
          <SideBar />
        </Box>
      </Stack>

      <Stack
        sx={{
          width: "70%",
          bgcolor: "white",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
