import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,  
  Button,
  Stack,
  Typography,
  TextField,  
  Grid,
  Skeleton,
} from "@mui/material";
import { teal } from '@mui/material/colors'; // Import MUI colors
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const NewGroup = () => {
  const { isNewGroup } = useSelector(state => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  

  const errors = [{
    isError,
    error,
  }];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => prev.includes(id) ? prev.filter((currElement) => currElement !== id)
      : [...prev, id]
    );
  };

  const submitHandler = async () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2) return toast.error("Please select at least 3 members");

    try {
      await newGroup("Creating New Group...", { name: groupName.value, members: selectedMembers });
      toast.success("Group created successfully!");
      closeHandler();
    } catch (error) {
      toast.error("Error creating group");
    }
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <DialogTitle 
        sx={{
          backgroundColor: teal[400], // Use teal color for background
          color: '#fff', // White text color
          userSelect: 'none', // Disable text selection
          textAlign: 'center', // Center align title
          borderRadius: '8px 8px 0 0', // Rounded corners only at the top
        }}
      >
        New Group
      </DialogTitle>

      <Stack 
        p={{ xs: "1rem", sm: "3rem" }} 
        width={"25rem"}
        sx={{
          backgroundColor: '#f0f0f0', // Light gray background color
          borderRadius: '0 0 8px 8px', // Rounded corners only at the bottom
        }}
      >
        <Stack spacing={2}>
          <TextField 
            value={groupName.value} 
            onChange={groupName.changeHandler}
            label="Group Name"
            variant="outlined"
            fullWidth
            color="primary" // Use primary color for input field
          />
          <Typography variant="body1">Members</Typography>
          <Grid container spacing={2} alignItems="center"> {/* Add spacing and align center */}
            {isLoading ? (<Skeleton />) : data?.friends?.map((user) => (
              <Grid item xs={12} key={user._id}>
                <UserItem
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Button variant="text" style={{ color: teal[400] }} onClick={closeHandler}> 
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={submitHandler} disabled={isLoadingNewGroup}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
