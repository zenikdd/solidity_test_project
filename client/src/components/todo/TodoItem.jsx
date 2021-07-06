import React, {useMemo} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import './todo-item.scss'

export const TodoItem = ({
         todo,
         handleOpenDialog,
         handleToggle,
         handleDelete
}) => {

    const transformedDate = useMemo(() => todo.createdAt.toISOString().split('T')[0], [todo.createdAt])

    return (
        <ListItem
        className={`todo-item ${todo.priority}`}
        onClick={handleToggle}
        >
            <Checkbox
                edge="start"
                checked={todo.isDone}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': todo.id }}
            />
            <ListItemText
                id={todo.id}
                primary={todo.name}
                secondary={transformedDate}
                className={todo.isDone? 'checked-todo': ''} />
            <ListItemSecondaryAction>
                    <DeleteOutlinedIcon
                        className="icon"
                        onClick = {() => handleDelete()}
                    />
                    <EditIcon
                        className="icon"
                        onClick={() => handleOpenDialog()}
                    />
            </ListItemSecondaryAction>
        </ListItem>
    )

};
