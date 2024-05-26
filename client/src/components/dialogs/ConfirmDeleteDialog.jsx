import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent,DialogContentText, DialogActions } from '@mui/material';
import {Button} from '@mui/material';

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
      <DialogContentText> 
      Are You sure you want to Delete this Group!!
      </DialogContentText>
       
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>NO</Button>
        <Button onClick={deleteHandler} color="error">Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default ConfirmDeleteDialog;
