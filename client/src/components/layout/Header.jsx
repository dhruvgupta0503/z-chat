import React, { lazy, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Backdrop } from '@mui/material';
import { teal } from '@mui/material/colors'; // Import MUI colors
import { Add as AddIcon, Menu as MenuIcon, Search as SearchIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import NewGroupDialog from '../specific/NewGroup';
import NotificationDialog from '../specific/Notifications';
const SearchDialog = lazy(() => import('../specific/Search'));

const Header = () => {
    const navigate = useNavigate();
    const [isMobile, setisMobile] = useState(false);
    const [isSearch, setisSearch] = useState(false);
    const [isNewGroup, setisNewGroup] = useState(false);
    const [isNotification, setisNotification] = useState(false);

    const handleMobile = () => {
        setisMobile(!isMobile);
    };

    const openSearch = () => {
        setisSearch(true);
    };

    const openNewGroup = () => {
        setisNewGroup(true);
    };

    const openNotification = () => {
        setisNotification(true);
    };

    const navigateToGroup = () => navigate("/groups");
    const logoutHandler = () => {
        console.log("Logout");
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' sx={{ bgcolor: teal[400] }}> {/* Change the bgcolor to teal[400] */}
                    <Toolbar>
                        <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>
                            Z-Chat
                        </Typography>
                        <Box sx={{ display: { xs: "block", sm: "none" } }}>
                            <IconButton color='inherit' onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                            <IconButton color="inherit" size="large" onClick={openSearch}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton color='inherit' size="large" onClick={openNewGroup}>
                                <AddIcon />
                            </IconButton>
                            <IconButton color='inherit' size="large" onClick={navigateToGroup}>
                                <GroupIcon />
                            </IconButton>
                            <IconButton color='inherit' size="large" onClick={openNotification}>
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton color='inherit' size="large" onClick={logoutHandler}>
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {isSearch && (
                <Suspense fallback={<Backdrop open />}>
                    <SearchDialog />
                </Suspense>
            )}
            {isNotification && (
                <Suspense fallback={<Backdrop open />}>
                    <NotificationDialog />
                </Suspense>
            )}
            {isNewGroup && (
                <Suspense fallback={<Backdrop open />}>
                    <NewGroupDialog />
                </Suspense>
            )}
        </>
    );
};

export default Header;
