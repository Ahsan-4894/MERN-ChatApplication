import { Stack, ListItem, Avatar, Typography, IconButton } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { TransformImage } from "../../lib/features";
const UserItem = ({
  user,
  handler,
  isHandlerLoading,
  isAdded = false,
  styling = {},
}) => {
  const { _id, name, avatar } = user;
  return (
    <ListItem>
      <Stack>
        <Stack
          direction={"row"}
          spacing={2}
          {...styling}
          sx={{
            overflow: "auto",
          }}
        >
          <Avatar src={TransformImage(avatar)} />
          <Typography
            variant="body1"
            sx={{
              alignContent: "center",
              width: 340,
            }}
          >
            {name}
          </Typography>
          <IconButton
            sx={{
              marginLeft: "10rem",
              bgcolor: `${isAdded ? "error.main" : "primary.main"}`,
              color: "white",
              width: "2rem",
              height: "2rem",
              "&:hover": {
                bgcolor: `${isAdded ? "error.dark" : "primary.dark"}`,
              },
            }}
            onClick={() => handler(_id)}
            disabled={isHandlerLoading}
          >
            {isAdded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
