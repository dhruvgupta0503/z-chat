import React, { Fragment, useRef, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Stack, IconButton, Skeleton } from '@mui/material';
import { grayColor } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';
import { useSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery } from '../redux/api/api';

const user = {
  _id: "sdfsdvs",
  name: "Giggles"
};

const Chat = ({chatId}) => {
  const containerRef = useRef(null);


  const socket = useSocket();

  const chatDetails =useChatDetailsQuery({chatId,skip:!chatId});
// console.log(chatDetails.data.chat.members)
  
  //const members=chatDetails.data.chat.members;

 

  const [message, setMessage] = useState("");
  const members=chatDetails?.data?.chat?.members
  console.log(members);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim())  return;


      
      // socket emit code 
      socket.emit(NEW_MESSAGE,{chatId,members,message});
      setMessage("");

      
  };

  return chatDetails.isLoading? (<Skeleton/>

  ) : (
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

      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack direction="row" height="100%" padding="1rem" alignItems="center" position="relative">
          <IconButton sx={{ rotate: "30deg" }}>
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
};

const ChatWithLayout = AppLayout(Chat);

export default ChatWithLayout;
