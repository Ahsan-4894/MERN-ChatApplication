import React, { useState } from "react";
import { useInputValidation } from "6pp";
import {sampleUsersData} from '../../constants/sampleChatData.js'

import {
  Dialog,
  DialogTitle,
  InputAdornment,
  TextField,
  List,
  ListItem,
  Typography,
  Button
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "./UserItem";
const SearchDialog = () => {
  const [users, setUsers] = useState(sampleUsersData);
  const [selectedUser, setSelectedUsers] = useState([]);
  const isLoadingFreindReq = false;
  const search = useInputValidation("");
  
  const addFriendReqHandler = (id)   => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((currId) => currId!==id) : [...prev, id]
    );
  };
  console.log(selectedUser)
  const handleSentFriendRequestHandler = ()=>{}
  return (
    <Dialog open sx={{
      overflow:"auto"
    }}>
      <div className="flex flex-col p-2 w-[30rem]">
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <List>
          {users.map((data, index) => (
            <UserItem
              user={data}
              key={data._id}
              handler={addFriendReqHandler}
              isHandlerLoading={isLoadingFreindReq}
              isAdded = {(selectedUser.includes(data._id) ? true : false)}
            />
          ))}
        </List>
        <Button variant="contained" onClick={handleSentFriendRequestHandler}>
          Sent Friend Request
        </Button>
      </div>
    </Dialog>
  );
};

export default SearchDialog;
