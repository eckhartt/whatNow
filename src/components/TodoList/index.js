import React from 'react';
import { List , ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';import {db} from '../Firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
// import './TodoList.css';


function TodoList({ todos }) {
    return (
        <List className="todo__list">
          {todos.map((data) => (
            <ListItem key={data.id}>
            <ListItemAvatar><Avatar><TaskIcon /></Avatar></ListItemAvatar>
            <ListItemText primary={data.item.todo} />
            <DeleteIcon fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'todos',data.id))}} />
            </ListItem>
          ))}
        </List>
    );
  }

export default TodoList;