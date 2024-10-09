import React, { lazy, Suspense, useState } from "react";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Aod as AodIcon,
} from "@mui/icons-material";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LayOutLoader } from "./Loaders.jsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../constants/config.js";
import { userNotExists } from "../redux/reducers/auth.js";
import { setIsNotification, setIsSearch } from "../redux/reducers/misc.js";

const SearchDialog = lazy(() =>
  import("../components/specifics/SearchDialog.jsx")
);
const NotificationsDialog = lazy(() =>
  import("../components/specifics/NotificationsDialog.jsx")
);
const NewGroupsDialog = lazy(() =>
  import("../components/specifics/NewGroupsDialog.jsx")
);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);

  const openSearchBox = () => dispatch(setIsSearch(true));

  const notificationBox = () => dispatch(setIsNotification(true));

  const openNewGroupBox = () => {
    setNewGroup(!isNewGroup);
  };

  const LogOut = async (e) => {
    const { data } = await axios.get(`${server}/api/v1/user/logout`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(userNotExists());
    toast.success("Logged Out successfully!");
    navigate("/login");
    try {
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }
  };

  const navigateToGroups = () => navigate("/groups");

  const [isNewGroup, setNewGroup] = useState(false);

  return (
    <>
      <nav className="h-[4rem] bg-slate-200  border-b-2 rounded-b-xl  ">
        <IconButton sx={{ position: "absolute", color: "#1976d2" }}>
          <AddIcon sx={{ height: "2.5rem", width: "2rem" }} />
        </IconButton>
        <div className="flex justify-between items-center ml-12">
          <h1 className="font-bold text-xl" style={{ color: "#1976d2" }}>
            ChatEasily
          </h1>
          <div className="flex gap-10">
            <Box>
              <Tooltip title="Search For A Friend">
                <IconButton
                  size="large"
                  onClick={openSearchBox}
                  color="primary"
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Create A New Group">
                <IconButton
                  size="large"
                  onClick={openNewGroupBox}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Manage Groups">
                <IconButton
                  size="large"
                  onClick={navigateToGroups}
                  color="primary"
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="LogOut">
                <IconButton size="large" onClick={LogOut} color="primary">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton
                  size="large"
                  onClick={notificationBox}
                  color="primary"
                >
                  <Badge badgeContent={notificationCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </div>
        </div>

        {isSearch && (
          <Suspense fallback={<LayOutLoader />}>
            <SearchDialog />
          </Suspense>
        )}

        {isNotification && (
          <Suspense fallback={<LayOutLoader />}>
            <NotificationsDialog />
          </Suspense>
        )}

        {isNewGroup && (
          <Suspense fallback={<LayOutLoader />}>
            <NewGroupsDialog />
          </Suspense>
        )}
      </nav>
    </>
  );
};

export default Header;
