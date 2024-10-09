import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import moment from "moment";
import { FileFormat, TransformImage } from "../../lib/features.js";
import RenderAttachments from "./RenderAttachments.jsx";

const MessageComponent = ({ message, user }) => {
  const { sender, attachments, content, createdAt } = message;
  const isSameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: isSameSender ? "flex-end" : "flex-start",
        backgroundColor: isSameSender ? "white" : "white",
        color: isSameSender ? "black" : "#012169",
        width: "25rem",
        marginTop: "1.2rem",
        padding: ".2rem",
        marginLeft: ".5rem",
        borderRadius: ".1rem",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
      }}
    >
      {!isSameSender && (
        <Typography variant="body1" color={"002D62"} fontWeight={"500"}>
          {sender.name}
        </Typography>
      )}
      {content && (
        <div
          style={{
            wordWrap: "break-word", // Ensure words break to the next line if they exceed the width
            overflowWrap: "break-word", // Alternative to wordWrap for wider browser support
            boxSizing: "border-box", // Ensure padding is included in the box size calculation
          }}
        >
          {content && <Typography>{content}</Typography>}
        </div>
      )}

      {/* Attachments */}

      {attachments?.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = FileFormat(url);
          return (
            <Box
              key={index}
              sx={{
                maxWidth: "100%",
              }}
            >
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachments(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography color="primary.secondary" variant="caption">
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
