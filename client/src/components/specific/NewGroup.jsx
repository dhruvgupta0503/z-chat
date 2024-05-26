import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,  
  Button,
  Stack,
  Typography,
  TextField,  
  Grid,
} from "@mui/material";
import { teal } from '@mui/material/colors'; // Import MUI colors
import { sampleUser } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';

const NewGroup = () => {

  const groupName=useInputValidation("");

  const [members,setMembers]=useState(sampleUser);  
  const [selectedMembers,SetSelectedMembers]=useState([]);
  const selectMemberHandler = (id) => {


  SetSelectedMembers((prev)=>prev.includes(id) ? prev.filter((currElement)=>currElement!==id)
:[...prev,id]
);

  };
 

  const submitHandler=()=>{};

  const closeHandler=()=>{};

  return (
    <Dialog open onClose={closeHandler}>
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
          <TextField value={groupName.value} onChange={groupName.changeHandler}
            label="Group Name"
            variant="outlined"
            fullWidth
            color="primary" // Use primary color for input field
          />
          <Typography variant="body1">Members</Typography>
          <Grid container spacing={2} alignItems="center"> {/* Add spacing and align center */}
            {members.map((user) => (
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
          <Button variant="text" style={{ color: teal[400] }}> {/* Use teal color for Cancel button */}
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
