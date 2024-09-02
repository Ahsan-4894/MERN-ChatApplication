import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import moment from "moment";
import { FileFormat } from "../../lib/features.js";
import RenderAttachments from "./RenderAttachments.jsx";

const MessageComponent = ({ message, user }) => {
  const { sender, attachments, content, createdAt } = message;
  const isSameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: isSameSender ? "flex-end" : "flex-start",
        backgroundColor: isSameSender ? "white" : "#1976d3",
        color: isSameSender ? "black" : "white",
        width: "15rem",
        marginTop: "1rem",
        padding: ".2rem",
        marginLeft: ".4rem",
      }}
    >
      {!isSameSender && (
        <Typography variant="caption" color={"white"} fontWeight={"500"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}

      {/* Attachments */}
      
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = FileFormat(url);
          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{ color: "black" }}
              >
                {RenderAttachments(file,url)}
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
