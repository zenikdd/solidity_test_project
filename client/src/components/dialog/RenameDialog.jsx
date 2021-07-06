import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const RenameDialog = ({
     open,
     handleClose,
     onConfirm,
     todo
}) => {

    const [newTitle, setNewTitle] = useState('')

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit todo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Edit todo"
                    type="text"
                    fullWidth
                    defaultValue = {todo.name}
                    onChange={e => setNewTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        onConfirm(newTitle)
                        handleClose()
                    }}
                    color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
