import React, { memo } from "react";

import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useErrors } from "../../hooks/hook.jsx";
import { TransformImage } from "../../lib/features.js";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api.js";
import { setIsNotification } from "../../redux/reducers/misc.js";
import toast from "react-hot-toast";

const NotificationsDialog = () => {
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  useErrors([{ isError, error }]);

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async (requestId, accept) => {
    try {
      const response = await acceptFriendRequest({ requestId, accept });

      if (response?.data) {
        //use socket here!!!

        toast.success(response.data.message);
      } else {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Oops! Something went wrong");
    }
  };
  const closeNotificationDialogBox = () => dispatch(setIsNotification(false));
  return (
    <Dialog open={isNotification} onClose={closeNotificationDialogBox}>
      <DialogTitle>Notifications</DialogTitle>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {data?.requests?.length > 0 ? (
            <>
              {data?.requests?.map(({ sender, _id }) => (
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
        </>
      )}
    </Dialog>
  );
};
const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack>
        <Stack direction={"row"} spacing={2}>
          <Avatar src={TransformImage(avatar)} />
          <Typography
            variant="body1"
            sx={{
              alignContent: "center",
              width: 340,
            }}
          >
            {name} Sent you a friend request
          </Typography>
          <Button
            onClick={() => {
              handler(_id, true);
            }}
          >
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => {
              handler(_id, false);
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default NotificationsDialog;
