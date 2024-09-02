import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { IconButton, Stack, Tooltip, Typography, TextField, Button, Box } from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/specifics/AvatarCard.jsx";
import { sampleChatsData, sampleUsersData } from "../constants/sampleChatData.js";
import AddFriendDialog from "../dialogs/AddFriendDialog.jsx";
import UserItem from "../components/specifics/UserItem.jsx";

const Groups = () => {
  const ConfirmDeleteDialog = lazy(()=> import("../dialogs/ConfirmDeleteDialog.jsx"));
  const isAdded=true;
  const chatID = useSearchParams()[0].get("group");

  const [groupName, setGroupName] = useState("");
  const [updatedGroupName, setupdatedGroupName] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [openAddMember, setOpenAddMember]= useState(false);
  
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);

  useEffect(() => {
   
    if(chatID){
      setGroupName(`Hamara Group${chatID}`);
      setupdatedGroupName(`Hamara Group${chatID}`);
    }
    return()=>{
      setGroupName(``);
      setupdatedGroupName(``);
      setIsEdit(false);
    }
  }, [chatID]);

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const updateGroupNameHandler = (e)=>{
    setupdatedGroupName(e.target.value);
  }

  const openAddMemberToGroup = ()=>{
      setOpenAddMember(true);
  }
  const closeAddMemberToGroup = ()=>{
    setOpenAddMember(false);
}
  const openDeleteTheGroup = ()=>{
    setOpenDeleteGroup(true);
  }
  const closeDeleteTheGroup = ()=>{
    setOpenDeleteGroup(false);
  }


  const addMemberToGroup = ()=>{

  }
  const deleteTheGroup = ()=>{
     
  }

  const deleteHandler = ()=>{
    console.log("Group delteted successfully!");
  }
  const removeMemberFromGroupHandler = (id)=>{
    console.log(`Removed ${id}`);
  }

  return (
    <section className="h-screen gap-1 w-screen flex justify-center items-center ">
      <div className="  w-[50%]  h-[100%] bg-blue-400 overflow-auto">
        <GroupList myGroups={sampleChatsData} chatID={chatID} />
      </div>

      <div className="">
        <Tooltip title="Go Back">
          <IconButton
            sx={{
              bgcolor: "#1976d2",
              position: "relative",
              top: "-20rem",
              height: "4rem",
              width: "4rem",
              ":hover": {
                bgcolor: "#1976d2",
              },
            }}
            onClick={navigateBack}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-[70%] h-[100%]">
        {groupName && (<>
          <Stack  justifyContent={"center"} direction={"col"} sx={{
            marginTop:"1rem"
          }}>
            {isEdit ? (
              <>
                <TextField value={updatedGroupName} onChange={updateGroupNameHandler}/>
                <IconButton onClick={()=>{setIsEdit(false);setGroupName(updatedGroupName)}}>
                  <DoneIcon/>
                </IconButton>
              </>
            ) : (
              <>
                <Typography variant="h4">{groupName}</Typography>
                <IconButton onClick={()=>setIsEdit(true)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Stack>
          <Stack textAlign={"center"} sx={{
            marginTop:"10rem",
            marginLeft:"12rem",
            width:"40rem",
            height:"30rem",
            overflow:"auto"
          }}>
            {
              sampleUsersData.map((i, index)=>(
                <UserItem key={i._id} user={i} handler={removeMemberFromGroupHandler} isAdded={isAdded} styling={{
                  boxShadow:"0px .0px 1px 0",
                  padding:"1rem 4rem",
                  borderRadius:"2rem",
                }} />
              ))
            }
          </Stack>

          <Stack sx={{
            width:"20rem",
            marginLeft:"25rem"
          }}>
            <br/>
          <Button onClick={openAddMemberToGroup} color="primary" variant="contained" size="large" startIcon={<AddIcon/>}>
              Add Members
            </Button>
            <Button onClick={openDeleteTheGroup} color='error' size="large" startIcon={<DeleteIcon />}>
              Delete Group
            </Button>
          </Stack>

          {openAddMember && 
            <Suspense fallback={<div>Loading...</div>}>
                <AddFriendDialog handlerClose={closeAddMemberToGroup}/>
            </Suspense>
          }

          {openDeleteGroup && 
            <Suspense fallback={<div>Loading...</div>}>
                <ConfirmDeleteDialog open={openDeleteGroup} handlerClose={closeDeleteTheGroup} deleteHandler={deleteHandler} />
            </Suspense>
          }
          
          </>
        )}
      </div>
    </section>
  );
};
const GroupList = ({ myGroups = [], chatID }) => (
  <Stack>
    {myGroups.length > 0 ? (
      myGroups.map((group, index) => (
        <>
          <GroupListItem key={group._id} group={group} chatID={chatID} />
          <br />
        </>
      ))
    ) : (
      <Typography>No Groups!</Typography>
    )}
    ;
  </Stack>
);
const GroupListItem = memo(({ group, chatID }) => {
  const { name, avatar, _id } = group;
  return (
    <Link to={`?group=${_id}`} className="hover:bg-gray-700">
      <Stack
        direction={"row"}
        alignItems={"center"}
        onClick={(e) => {
          if (chatID === _id) e.preventDefault();
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography
          variant="h6"
          textAlign={"center"}
          sx={{
            marginTop: "1rem",
            marginLeft: "2rem",
          }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
