import { Menu,Stack } from '@mui/material'
import React from 'react'

const DeleteChatMenu = ({dispatch,deleteOptionsAnchor}) => {

    const closeHandler=()=>{};
  return  <Menu> open onClose={closeHandler} anchorE1={deleteOptionsAnchor}
  <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        
      >
      sdfss


  </Stack>
  
  
  </Menu>
  
}

export default DeleteChatMenu