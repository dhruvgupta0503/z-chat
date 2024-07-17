// AppLayout.jsx
import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import ChatList from '../specific/ChatList';
import Header from './Header';
//import { samplechats } from '../../constants/sampleData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { useMyChatsQuery } from '../../redux/api/api';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import Profile from '../specific/Profile';
//import { useEffect } from 'react';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../../constants/events';
import { getOrSaveFromStorage } from '../../lib/features';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat';
import { useSocket } from "../../socket";
import DeleteChatMenu from '../dialogs/DeleteChatMenu';

const AppLayout = (WrappedComponent) => {
    const ComponentWithLayout = (props) => {
        // Move the useParams() hook inside the function component
        const dispatch=useDispatch();
        const navigate=useNavigate();
        const { chatId } = useParams();
        const deleteMenuAnchor=useRef(null);

        const socket=useSocket();
        

        const { isMobile } = useSelector((state)=>state.misc);
        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);
      

        const {isLoading,data,isError,error,refetch} = useMyChatsQuery("")

       useErrors([{isError,error}]);

       useEffect(()=>{
        getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert});
       },[newMessagesAlert])

        

        // Define handleDeleteChat function
        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({chatId,groupChat}));
            deleteMenuAnchor.current = e.currentTarget;
            
           

        }

        const handleMobileClose=()=>{
            dispatch(setIsMobile(false));
        }



        const newMessageAlertHandler=useCallback((data)=>{
            if(data.chatId===chatId) return;


            dispatch(setNewMessagesAlert(data));

            
        },[chatId]);

        const newRequestHandler=useCallback(()=>{
            dispatch(incrementNotification())
        },[dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/home");
          }, [refetch],navigate);
        
  const eventHandlers = { 
    [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
    [NEW_REQUEST]:newRequestHandler,
    [REFETCH_CHATS]:refetchListener,
};
  useSocketEvents(socket, eventHandlers);

        return (
            <div>
                <Header />
                <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
                {
                    isLoading?<Skeleton/>:(
                        <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId} // Pass the chatId to ChatList
                            handleDeleteChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
                            
                        />
                        </Drawer>
                    )
                }
                <Grid container height="calc(100vh - 4rem)">
                    <Grid item sm={4} md={3} sx={{
                        display: { xs: "none", sm: "block" },
                    }} height="100%">
                       {
                        isLoading?(<Skeleton/>):( <ChatList
                            chats={data?.chats}
                            chatId={chatId} // Pass the chatId to ChatList
                            handleDeleteChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
                        />)
                       }
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid item md={4} lg={3} height="100%" sx={{
                        display: { xs: "none", md: "block" },
                        padding: "2rem",
                        bgcolor: "rgba(0,0,0,0.85)",
                    }}>
                        <Profile user={user}/>
                    </Grid>
                </Grid>
            </div>
        );
    };

    // Add a check to ensure WrappedComponent is defined before accessing its properties
    ComponentWithLayout.displayName = `AppLayout(${getDisplayName(WrappedComponent)})`;

    return ComponentWithLayout;
};

// Helper function to get the display name of the wrapped component
function getDisplayName(WrappedComponent) {
    return WrappedComponent ? (WrappedComponent.displayName || WrappedComponent.name || 'Component') : 'Component';
}

export default AppLayout;
 