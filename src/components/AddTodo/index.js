/** @jsxImportSource theme-ui */
import React, { useState, useContext } from "react";
// import { TextField, Button } from '@mui/material';
import { Button } from 'theme-ui'
import { Input } from 'theme-ui'
import { db } from '../Firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AuthContext from "../Auth/AuthContext";
import { Container } from "../Layout"


function AddTodo() {
  const { user } = useContext(AuthContext); // Bring in user data from context
  const [input, setInput] = useState(""); // Setup state for task input field
  
  // Function to save todo input field into firebase
  const saveTodo = (input) => {
    addDoc(collection(db,'tasks'),{
        taskName:input,
        creationDate: serverTimestamp(),
        complete: false,
        ownerId: user.uid,
        ownerName: user.displayName,
        type: 'todo',
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTodo(input); // Save to firebase
    setInput(""); // Update state for input field to empty string
  };

  return (
    <>
        <form sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '3'}} onSubmit={handleSubmit}>
            <Input required value={input} onChange={(e) => setInput(e.target.value)} />
            <Button type="submit">Add Task</Button>
        </form>
    </>
  );
}

export default AddTodo;