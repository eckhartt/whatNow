import React, { useState } from "react";
import { TextField, Button } from '@mui/material';


function AddTodo({ saveTodo, getTodos }) {
  // Setup state for task input field 
  const [input, setInput] = useState("");

  // Setup submission handler 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`input is`,input);
    // Save to firebase
    saveTodo(input);
    // Pull updated list of todos
    getTodos();
    // Update state
    setInput("");
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