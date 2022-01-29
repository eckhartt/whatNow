import { React, useState, useEffect } from 'react';
import { List , ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import { db } from '../Firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


function TodoList() {
  const [todos, setTodos] = useState([]); // Setup state for holding list of todo items

  // Function to pull current list of todos from firebase
  const getTodos = () => {
      onSnapshot(query(collection(db,'tasks'),where('ownerId', '==', getAuth().currentUser.uid),orderBy('creationDate','desc')),(snapshot)=>{
          console.log(`snapshot is`,snapshot);
          const currentFirebaseTodos = [];
          currentFirebaseTodos.push(snapshot.docs.map(doc=>({
              id: doc.id,
              item: doc.data()
          })))
          console.log(`currentFirebaseTodos[0] is`,currentFirebaseTodos[0]);
          setTodos(currentFirebaseTodos[0]);
      })
  }

    // Fill todos state on first render & attach snapshot
    useEffect(() => {
      getTodos();
    }, []);

    return (
        <List className="todo__list">
          {todos.map((data) => (
            <ListItem key={data.id}>
            <ListItemAvatar><Avatar><TaskIcon /></Avatar></ListItemAvatar>
            <ListItemText primary={data.item.taskName} />
            <DeleteIcon fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'tasks',data.id))}} />
            </ListItem>
          ))}
        </List>
    );
  }

export default TodoList;