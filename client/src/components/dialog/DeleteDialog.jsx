import React from 'react'
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const DeleteDialog = ({
      handleClose,
      open,
      onConfirm,
      todo
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Are u sure?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    autoFocus
                    onClick={() => {
                        onConfirm(todo.id)
                        handleClose()
                }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
