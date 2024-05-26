import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar,
  name,
  _id,
  groupChat,
  sameSender,
  isOnline,
  newMessageAlert,
  //index=0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          padding: "1rem",
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

ChatItem.propTypes = {
  avatar: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  groupChat: PropTypes.bool,
  sameSender: PropTypes.bool,
  isOnline: PropTypes.bool,
  newMessageAlert: PropTypes.shape({
    count: PropTypes.number.isRequired,
  }),
  index: PropTypes.number,
  handleDeleteChat: PropTypes.func.isRequired,
};

export default memo(ChatItem);
