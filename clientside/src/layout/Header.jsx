import React, { lazy, Suspense, useState } from "react";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Aod as AodIcon
} from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LayOutLoader } from "./Loaders.jsx";

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

  const openSearchBox = () => {
    setSearch(!isSearch);
  };
  const openNewGroupBox = () => {
    setNewGroup(!isNewGroup);
  };

  const LogOut = () => {
    //destroy cookie and navigate("/login")
  };
  const notificationBox = () => {
    setNotification(!isNotification);
  };

  const navigateToGroups = () => navigate("/groups");

  const [isSearch, setSearch] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isNewGroup, setNewGroup] = useState(false);


  return (
    <>
      <nav className="h-[4rem] bg-slate-200  border-b-2 rounded-b-xl  ">
          <IconButton sx={{position:"absolute",
            color:"#1976d2"
          }}>
            <AodIcon sx={{height:"2.5rem",width:"2rem",}}/>
          </IconButton>
        <div className="flex justify-between items-center ml-12">
          <h1 className="font-bold text-xl" style={{color:"#1976d2"}}>ChatEasily</h1>
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
                  <NotificationsIcon />
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
