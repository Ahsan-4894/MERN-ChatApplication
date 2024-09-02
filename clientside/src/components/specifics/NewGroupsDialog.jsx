import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  TextField,
  List,
  ListItem,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useInputValidation } from "6pp";
import GroupIcon from "@mui/icons-material/Group";
import { sampleUsersData } from "../../constants/sampleChatData.js";
import UserItem from "./UserItem";

const NewGroupsDialog = () => {
  const groupName = useInputValidation("");
  
  const newGroupCreatedHandler = () => {};

  const [members, setMembers] = useState(sampleUsersData);
  const [selectedMembers, setselectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currId) => currId!==id) : [...prev, id]
    );
  };
  const closeHandler = ()=>{

  }

  return (
    <Dialog open onClose={closeHandler}>
      <div className="flex flex-col p-2 w-[30rem]">
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>

        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          variant="outlined"
          size="small"
          placeholder="Group Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Typography
          variant="h6"
          sx={{
            marginLeft: "1rem",
          }}
        >
          Members
        </Typography>
        <Stack>
          {members.map((user, index) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded = {(selectedMembers.includes(user._id) ? true : false)}
            />
          ))}
        </Stack>
        <Stack>
          <Button color="error">Cancel</Button>
          <Button variant="contained" onClick={newGroupCreatedHandler}>
            Create
          </Button>
        </Stack>
      </div>
    </Dialog>
  );
};

export default NewGroupsDialog;
