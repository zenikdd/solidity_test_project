import React from 'react'
import Alert from '@material-ui/lab/Alert';
import {Snackbar} from "@material-ui/core";

export const AlertMessage = ({text, severity, handleClose, open}) => {
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    )
}