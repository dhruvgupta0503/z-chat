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
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';
import { setIsMobile,setIsSearch, setIsNotification } from '../../redux/reducers/misc';
//import {notificationCount} from '../../redux/reducers/chat';
import {Tooltip,Badge} from '@mui/material';
import { resetNotificationCount } from '../../redux/reducers/chat';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isSearch,isNotification}=useSelector(state=>state.misc)
    const {notificationCount}= useSelector(state=>state.chat)
    



    //const [isMobile, setisMobile] = useState(false);
   // const [ setisSearch] = useState(false);
    const [isNewGroup, setisNewGroup] = useState(false);
    //const [isNotification, setisNotification] = useState(false);

    const handleMobile = () => dispatch(setIsMobile(true));

    const openSearch = () => {
        dispatch(setIsSearch(true));
        //setisSearch(true);

    };

    const openNewGroup = () => {
        setisNewGroup(true);
    };

    const openNotification = () => {
        dispatch(setIsNotification(true))
        dispatch(resetNotificationCount())
    }

    const navigateToGroup = () => navigate("/groups");

    const logoutHandler = async () => {
        try {
          //  console.log("Logout");
            const { data } = await axios.get(`${server}/api/v1/user/logout`, {
                withCredentials: true,
            });
            dispatch(userNotExists());
            toast.success(data.message);
            navigate("/login")
          // console.log("serfr",data)
           // console.log("isWorking2");
        } catch (error) {
          //  console.log("isWorking4");
            toast.error(error?.response?.data?.message || "Something went wrong");
        //  console.log("sdfs",error)
           // console.log("isWorking5");
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
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
                
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
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

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {value ? (
            <Badge badgeContent={value} color="error">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
    );
  };

export default Header;
