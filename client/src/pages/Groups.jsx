
import React, { Suspense, lazy, useEffect } from 'react';
import { Backdrop, ButtonGroup, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Add, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Drawer } from '@mui/material';
import { memo } from 'react';
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { sampleUser, samplechats } from "../constants/sampleData";
import { Edit as EditIcon } from '@mui/icons-material';
import {TextField} from '@mui/material';
import { Done as DoneIcon } from '@mui/icons-material';
import {Button} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Add as AddIcon } from '@mui/icons-material';
import UserItem from '../components/shared/UserItem';
import { bgGradient } from '../constants/color';
import { useMyGroupsQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hook';
import { LayoutLoader } from '../components/layout/Loaders';

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"));
const isAddMember = false;

const Groups = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("group");
  const navigate = useNavigate();

const myGroups=useMyGroupsQuery("")

console.log(myGroups.data);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const errors=[{
    isError:myGroups.isError,
    error:myGroups.error,
},
]

  useErrors(errors)

  const navigateBack = () => {
    navigate("/home");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen(true); // Open the menu on clicking the mobile icon
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    console.log("Add Member");
  };

  const deleteHandler = () => {
    console.log("delete handler");
    closeConfirmDeleteHandler();
  };

  const removeMemberHandler = (id) => {
    console.log("remove member", id);
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 9999,
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: "rgba(0,0,0,0.8)",
          color: "white",
          ":hover": {
            bgcolor: "rgba(0,0,0,0.7)",
          },
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </>
  );

  const GroupName = (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
      {isEdit ? (
        <>
          <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant='h4'>{groupName} </Typography>
          <IconButton onClick={() => setIsEdit(true)}><EditIcon /></IconButton>
        </>
      )}
    </Stack>
  );

  const GroupButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse", // Stack the buttons in reverse order on small screens
        sm: "row"
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem"
      }}
    >
      <Button size='large' variant="contained" startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>
      <Button size='large' variant="contained" color='error' startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
    </Stack>
  );

  return myGroups.isLoading?<LayoutLoader/>: (
    <Grid container height="100vh" justifyContent="space-between">
      <Grid
        item
        sm={4}
        sx={{
          // backgroundImage: bgGradient
        }}
      >
        <GroupsList myGroups={samplechats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName && <>
          {GroupName}
          <Typography margin={'2rem'}
            alignSelf={"flex-start"}
            variant="body1"
          >Members</Typography>
          <Stack
            maxWidth={"45rem"}
            width={"100%"}
            boxSizing={"border-box"}
            padding={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem"
            }}
            spacing={"2rem"}
            height={"50vh"}
            overflow={"auto"}
          >
            {/*members */}
            {sampleUser.map((i) => (
              <UserItem user={i} key={i._id} isAdded styling={{
                boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                padding: "1rem 2rem",
                borderRadius: "1rem",
              }}
                handler={removeMemberHandler}
              />
            ))}
          </Stack>
          {GroupButtonGroup}
        </>}
      </Grid>

      {isAddMember && (<Suspense fallback={<Backdrop open />}>
        <AddMemberDialog />
      </Suspense>
      )}

      {confirmDeleteDialog && (<Suspense fallback={<Backdrop open />}>
        <ConfirmDeleteDialog open={confirmDeleteDialog}
          handleClose={closeConfirmDeleteHandler}
          deleteHandler={deleteHandler}
        />
      </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} myGroups={samplechats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

Groups.displayName = 'Groups'; // Add displayName property

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundImage: bgGradient,
      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

GroupsList.propTypes = {
  w: PropTypes.string,
  chatId: PropTypes.string,
  myGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

GroupListItem.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.oneOfType([
      PropTypes.string, // Allow string type
      PropTypes.arrayOf(PropTypes.string) // Allow array of strings
    ]).isRequired,
    _id: PropTypes.string.isRequired,
    chatId: PropTypes.string,
  }).isRequired,
};

GroupListItem.displayName = 'GroupListItem'; // Add displayName property

export default Groups;
