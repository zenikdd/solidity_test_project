import React, {useState} from 'react';
import {Button, MenuItem, Select, TextField} from "@material-ui/core";
import {AlertMessage} from "../alert/AlertMessage";
import './input-form.scss'
import {Priority} from '../../common'

export const InputForm = ({onAdd}) => {

    const [todoTitle, setTodoTitle] = useState('')
    const [todoPriority, setTodoPriority] = useState('');
    const [showAlert, setShowAlert] = useState(false)

    const addTodo = () => {
        if (!todoTitle.trim() || !todoPriority.trim()) {
            setShowAlert(true);
            return
        }

        onAdd({name: todoTitle, priority: todoPriority});
        setTodoTitle('')
        setTodoPriority('')
    }

    return (
        <>
            <div className="input-form">
                <div className="input">
                    <TextField
                        label="Enter todo..."
                        fullWidth={true}
                        value={todoTitle}
                        onKeyDown={addTodo}
                        onChange={(e) => setTodoTitle(e.target.value)}/>
                </div>
                <Select
                    value={todoPriority}
                    onChange={e => setTodoPriority(e.target.value)}
                >
                    <MenuItem value={Priority.HIGH}>
                        High
                    </MenuItem>
                    <MenuItem value={Priority.MIDDLE}>
                        Middle
                    </MenuItem>
                    <MenuItem value={Priority.LOW}>
                        Low
                    </MenuItem>
                </Select>
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => {
                        addTodo()
                    }}>Add</Button>
            </div>

            <AlertMessage
                text="ERROR! Fill in the form fields"
                severity="error"
                open={showAlert}
                handleClose={() => setShowAlert(false)}
            />
        </>
    )
};
