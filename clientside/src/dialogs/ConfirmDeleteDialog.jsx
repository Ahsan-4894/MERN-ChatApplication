import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open, handlerClose, deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handlerClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteHandler} color='error'>Yes</Button>
        <Button onClick={handlerClose}>No</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
