import { useInputValidation } from "6pp";
import React, { useEffect, useState } from "react";
import { sampleUsersData } from "../../constants/sampleChatData.js";

import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook.jsx";
import {
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api.js";
import { setIsSearch } from "../../redux/reducers/misc.js";
import UserItem from "./UserItem";

const SearchDialog = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState(sampleUsersData);
  const [selectedUser, setSelectedUsers] = useState([]);

  const search = useInputValidation("");

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUsersQuery();
  const [sendFriendRequest, isLoadingFreindReq] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const closeSearchHandler = () => dispatch(setIsSearch(false));

  const handleSentFriendRequestHandler = async (id) => {
    await sendFriendRequest("Sending friend Request...", { receiverId: id });
  };

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      try {
        const response = await searchUser(search.value);
        setUsers(response?.data?.message);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Dialog
      open={isSearch}
      onClose={closeSearchHandler}
      sx={{
        overflow: "auto",
      }}
    >
      <div className="flex flex-col p-2 w-[30rem] overflow-auto overflow-y-auto">
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
              handler={handleSentFriendRequestHandler}
              isHandlerLoading={isLoadingFreindReq}
              isAdded={selectedUser.includes(data._id) ? true : false}
            />
          ))}
        </List>
      </div>
    </Dialog>
  );
};

export default SearchDialog;
