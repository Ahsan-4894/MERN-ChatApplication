import React, { memo, useState } from "react";

import { sampleNotificationData } from "../../constants/sampleChatData.js";
import {TransformImage} from '../../lib/features.js'
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  TextField,
  List,
  ListItem,
  Typography,
  Avatar,
  Stack,
  Button
} from "@mui/material";

const NotificationsDialog = () => {
  const friendRequestHandler = (_id, accept) => {};
  return (
    <Dialog open>
      <DialogTitle>Notifications</DialogTitle>
        {sampleNotificationData.length > 0 ? (
          <>
            {sampleNotificationData.map(({ sender, _id }) => (
              <NotificationItem
                sender={sender}
                _id={_id}
                handler={friendRequestHandler}
                key={_id}
              ></NotificationItem>
            ))}
          </>
        ) : (
          <Typography textAlign="center">0 Notifications</Typography>
        )}
    </Dialog>
  );
};
const NotificationItem = memo(({sender, _id, handler}) => {
  const {name, avatar} = sender;
  return (
    <ListItem>
      <Stack>
        <Stack direction={"row"} spacing={2}>
          <Avatar src={TransformImage(avatar)}/>
          <Typography
            variant="body1"
            sx={{
              alignContent: "center",
              width: 340,
            }}
          >
            {name} Sent you a friend request
          </Typography>
          <Button onClick={()=>{handler(_id, true)}}>Accept</Button>
          <Button color="error" onClick={()=>{handler(_id, false)}}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default NotificationsDialog;
