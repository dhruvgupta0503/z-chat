// AppLayout.jsx
import React from 'react';
import Header from './Header';
import { Grid } from '@mui/material';
import ChatList from '../specific/ChatList';
import { samplechats } from '../../constants/sampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
const AppLayout = (WrappedComponent) => {
    const ComponentWithLayout = (props) => {
        // Move the useParams() hook inside the function component
        const { chatId } = useParams();

        // Define handleDeleteChat function
        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("Delete Chat", _id, groupChat);
        }

        return (
            <div>
                <Header />
                <Grid container height="calc(100vh - 4rem)">
                    <Grid item sm={4} md={3} sx={{
                        display: { xs: "none", sm: "block" },
                    }} height="100%">
                        <ChatList
                            chats={samplechats}
                            chatId={chatId} // Pass the chatId to ChatList
                            handleDeleteChat={handleDeleteChat}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item md={4} lg={3} height="100%" sx={{
                        display: { xs: "none", md: "block" },
                        padding: "2rem",
                        bgcolor: "rgba(0,0,0,0.85)",
                    }}>
                        <Profile/>
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
 