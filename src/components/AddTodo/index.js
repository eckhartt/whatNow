import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import { db } from '../Firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

function AddTodo() {
  
  const [input, setInput] = useState(""); // Setup state for task input field

  // Function to save todo input field into firebase
  const saveTodo = (input) => {
    addDoc(collection(db,'tasks'),{
        taskName:input,
        creationDate: serverTimestamp(),
        complete: false,
        ownerId: getAuth().currentUser.uid,
        ownerName: getAuth().currentUser.displayName,
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
      <center>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <TextField id="outlined-basic" variant="outlined" style={{margin:"0px 5px"}} size="small" required value={input} onChange={(e) => setInput(e.target.value)} />
            <Button variant="contained" color="primary" type="submit">Add Task</Button>
          </div>
        </form>
      </center>
    </>
  );
}

export default AddTodo;