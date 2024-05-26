import { Dialog, Stack, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUser } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { Button } from '@mui/material';

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {


  

    const [members,setMembers]=useState(sampleUser);
    const [selectedMembers,setSelectedMembers]=useState([]);

    const selectedMemberHandler=(id)=>{
        setSelectedMembers((prev)=>prev.includes(id)
        ? prev.filter((currElement)=>currElement!==id):[...prev,id]
    )
    }
 

 

  const closeHandler=()=>{
    setSelectedMembers([]);
    setMembers([]);
  };
  const addMemberSubmitHandler=()=>{
    closeHandler();
  };

  

  return (
    <Dialog onClose={closeHandler} open maxWidth="sm" fullWidth>
      <Stack spacing={2} padding={3}>
        <DialogTitle>Add Member</DialogTitle>

        <Stack spacing={2} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem key={i.id} user={i} handler={selectedMemberHandler}  isAdded={selectedMembers.includes(i._id)}/>
            ))
          ) : (
            <Typography textAlign="center">No Friends</Typography>
          )}
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={addMemberSubmitHandler} variant="contained" color="primary" disabled={isLoadingAddMember}>
            Submit Changes
          </Button>
          <Button onClick={closeHandler} variant="outlined" color="error">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
