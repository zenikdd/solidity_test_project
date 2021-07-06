import React, {useState} from 'react';
import List from '@material-ui/core/List';
import {TodoItem} from "./TodoItem";
import {RenameDialog} from "../dialog/RenameDialog";
import {DeleteDialog} from "../dialog/DeleteDialog";

export const TodoList = ({todos, handleToggle, handleDelete, handleSave}) => {

    const [isShowRenameDialog, setIsShowRenameDialog] = useState(false)
    const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false)
    const [selectedTodoWithIndex, setSelectedTodoWithIndex] = useState(null)

    const openRenameDialog = (todo, index) => {
        setSelectedTodoWithIndex({todo, index})
        setIsShowRenameDialog(true)
    }

    const openDeleteDialog = (todo, index) => {
        setSelectedTodoWithIndex({todo, index})
        setIsShowDeleteDialog(true)
    }

    return (
        <>
            <List>
                {todos.map((todo, index) => <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleToggle={() => handleToggle(index)}
                    handleDelete={() => openDeleteDialog(todo, index)}
                    handleOpenDialog={() => openRenameDialog(todo, index)}
                />)}
            </List>
            {selectedTodoWithIndex && <>
                <RenameDialog
                    open={isShowRenameDialog}
                    handleClose={() => setIsShowRenameDialog(false)}
                    todo={selectedTodoWithIndex.todo}
                    onConfirm={(newName) => handleSave(newName, selectedTodoWithIndex.index)}
                />
                <DeleteDialog
                    open={isShowDeleteDialog}
                    handleClose={() => setIsShowDeleteDialog(false)}
                    todo={selectedTodoWithIndex.todo}
                    onConfirm={() => handleDelete(selectedTodoWithIndex.index)}
                />
            </>}
        </>
    )

};

