import React, { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Stack, IconButton, Skeleton, Typography } from '@mui/material';
import { grayColor } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { useSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc';
import { removeNewMessagesAlert } from '../redux/reducers/chat';

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = useSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages || []
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  useErrors(errors);

  const members = chatDetails?.data?.chat?.members || [];

  // Initialize messages state when chatDetails changes
  useEffect(() => {
    if (chatDetails?.data?.chat?.messages) {
      setMessages(chatDetails.data.chat.messages);
    }
  }, [chatDetails]);



  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // socket emit code 
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(()=>{
    dispatch(removeNewMessagesAlert(chatId));

    
    return ()=>{


      setMessages([]);
    setMessage("");
    setPage(1);
    setOldMessages([]);
    }
  },[chatId])

  const newMessagesHandler = useCallback((data) => {
    if(data.chatId!==chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const eventHandlers = { [NEW_MESSAGE]: newMessagesHandler };
  useSocketEvents(socket, eventHandlers);

  const allMessages = [...(oldMessages || []), ...messages];

  if (chatDetails.isLoading || oldMessagesChunk.isLoading) {
    return <Skeleton />;
  }

  if (chatDetails.isError || oldMessagesChunk.isError) {
    return <Typography color="error">An error occurred while fetching chat details or messages.</Typography>;
  }

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
        {allMessages.map((msg) => (
          <MessageComponent key={msg._id} message={msg} user={user} />
        ))}
      </Stack>

      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack direction="row" height="100%" padding="1rem" alignItems="center" position="relative">
          <IconButton sx={{ rotate: "30deg" }} onClick={handleFileOpen}>
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
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

const ChatWithLayout = AppLayout(Chat);

export default ChatWithLayout;
