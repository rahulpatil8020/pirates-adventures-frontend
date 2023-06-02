import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Button,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ConfirmationDialog = ({ confirmSubmit, dialogOpen, setDialogOpen }) => {
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"You sure about this?"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleDialogClose}>No</Button>
        <Button onClick={confirmSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
