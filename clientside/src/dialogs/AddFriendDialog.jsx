import { Dialog, Stack, Button, DialogTitle, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { sampleUsersData } from "../constants/sampleChatData.js";
import UserItem from "../components/specifics/UserItem.jsx";
const AddFriendDialog = ({
  addMember,
  isLoadingAddMember,
  chatID,
  handlerClose,
}) => {
  const AddFriendHandler = () => {
    console.log("Firend added");
  };
  const [members, setMembers] = useState(sampleUsersData);
  const [selectedMembers, setselectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currId) => currId !== id) : [...prev, id]
    );
  };
  const AddMemberSubmitHandler = () => {};

  //   useEffect(()=>{
  //     return()=>{
  //         setselectedMembers([]);
  //         setMembers([]);
  //         console.log(selectedMembers, members);
  //     }
  //   }, [])
  return (
    <Dialog open onClose={handlerClose}>
      <Stack p={"2rem"} alignItems={"center"}>
        <DialogTitle>Add Members</DialogTitle>
        <Stack>
          {sampleUsersData.length > 0 ? (
            <>
              {sampleUsersData.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id) ? true : false}
                />
              ))}
            </>
          ) : (
            <Typography>No Friends!</Typography>
          )}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={"4rem"}>
          <Button onClick={handlerClose} color="error">
            Cancel
          </Button>
          <Button onClick={AddMemberSubmitHandler} variant="contained">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddFriendDialog;
