import Dialog from '@mui/material/Dialog';
import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';

export const DeleteProductDialog: React.FC<{
  open: boolean;
  handleClose: () => void;
  onConfirmDeleteProducts: () => void;
}> = ({ open, handleClose, onConfirmDeleteProducts }) => {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete all selected products
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete all selected products, this action will not be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={handleClose}
        >Disagree</Button>
        <Button
          color="primary"
          onClick={onConfirmDeleteProducts}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};