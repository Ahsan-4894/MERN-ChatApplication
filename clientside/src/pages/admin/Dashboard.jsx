import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import {
  Paper,
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";

const Dashboard = () => {
  const AppBar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem",
        height: "10rem",
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3.5rem",
          }}
        />
        <TextField
          placeholder="Search..."
          sx={{
            width: "20rem",
          }}
        />
        <Button variant="contained">ClickMe</Button>
        <Box flexGrow={1} />
        <Typography>
          {moment().format("dddd, D MMMM YYYY")}
          <NotificationsIcon />
        </Typography>
      </Stack>
    </Paper>
  );

  const Widget = ({ title, value, Icon }) => (
    <Paper elevation={3} sx={{
      width: "25%",
      height:"17rem",
      position: "relative",
    }}>
      <Stack sx={{height:"100%", width:"100%"}} direction={"column"}>
        <Stack sx={{height:"50%", width:"100%"}} textAlign={"center"} justifyContent={"center"}>
          <Typography>{value}</Typography>
          <Typography sx={{
            position:"absolute",
            border:"4px solid black",
            borderRadius:"50%",
            width:"7rem",
            height:"7rem",
            left:"6.5rem"
          }}></Typography>
        </Stack>
        
        <Stack spacing={'.5rem'} textAlign={'center'} sx={{height:"50%", width:"100%"}} direction={"row"} justifyContent={"center"} alignItems={"center"}>
          <IconButton>
            {Icon}
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Stack>
      
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={"row"}
      justifyContent={"space-evenly"}
      alignItems={""}
      sx={{
        marginTop: "3rem",
        width: "95%",
        height: "18rem",
        marginLeft: "2rem",
      }}
    >
      <Widget title={"Users"} value={100} Icon={<PersonIcon sx={{color:"#1976d2"}}/>} />
      <Widget title={"Chats"} value={200} Icon={<GroupIcon sx={{color:"#1976d2"}}/>} />
      <Widget title={"Messages"} value={300} Icon={<MessageIcon sx={{color:"#1976d2"}}/>} />
    </Stack>
  );

  return (
    <AdminLayout>
      <section>
        {AppBar}

        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <Paper
            elevation={3}
            sx={{
              width: "95%",
              position: "relative",
              left: "2rem",
              padding: "2rem 2rem",
            }}
          >
            <Typography>Last 7 Day Messages</Typography>
            {"CHAT"}
          </Paper>
        </Stack>

        <Stack>
          <Paper
            elevation={3}
            sx={{
              width: "80%",
              height: "30rem",
              position: "relative",
              left: "8rem",
              padding: "2rem 2rem",
              top: "2rem",
            }}
          >
            {"Dounut Chart"}
            <Stack
              direction={"row"}
              sx={{
                position: "absolute",
                left: "30rem",
                alignItems: "center",
              }}
            >
              <IconButton color="primary">
                <PersonIcon />
              </IconButton>
              <Typography>VS</Typography>
              <IconButton color="primary">
                <PersonIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
