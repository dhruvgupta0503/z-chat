import React, { lazy, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Backdrop } from '@mui/material';
import { teal } from '@mui/material/colors'; 
import { Add as AddIcon, Menu as MenuIcon, Search as SearchIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import NewGroupDialog from '../specific/NewGroup';
import NotificationDialog from '../specific/Notifications';
import axios from 'axios';
const SearchDialog = lazy(() => import('../specific/Search'));
import { server } from '../../constants/config';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const logoutHandler = async () => {
        try {
            console.log("Logout");
            const { data } = await axios.get(`${server}/api/v1/user/logout`, {
                withCredentials: true,
            });
            dispatch(userNotExists());
            toast.success(data.message);
           console.log("serfr",data)
            console.log("isWorking2");
        } catch (error) {
            console.log("isWorking4");
            toast.error(error?.response?.data?.message || "Something went wrong");
          console.log("sdfs",error)
            console.log("isWorking5");
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' sx={{ bgcolor: teal[400] }}>
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
