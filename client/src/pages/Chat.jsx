import React, { Fragment, useRef } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Stack } from '@mui/material';
import { grayColor } from '../constants/color';
import { Icon as IconButton } from '@mui/material';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: "sdfsdvs",
  name: "Giggles"
};

// Chat component needs to be a function component
const Chat = () => {
  const containerRef = useRef(null);

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing="border-box"
        padding="1rem"
        spacing="1rem"
        bgcolor={grayColor}
        height="90%"
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        {sampleMessage.map((message) => (
          <MessageComponent key={message._id} message={message} user={user} />
        ))}
      </Stack>

      <form style={{ height: "10%" }}>
        <Stack direction="row" height="100%" padding="1rem" alignItems="center" position="relative">
          <IconButton sx={{ rotate: "30deg" }}>
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder="Type Message here..." />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
};

// Wrap Chat component with AppLayout
const ChatWithLayout = AppLayout(Chat);

export default ChatWithLayout;
